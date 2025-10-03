import { UIElement, tags } from "ziko/ui/index.js";
import { StroopConfig } from "../config/index.js";
import { ColorSetManager } from "../colors-manager/index.js";
import { TrialGenerator, TrialResult } from "../trial/index.js";
import "./index.css";
const { div } = tags;

class UIStroop extends UIElement {
  constructor({ trials = 20, congruentPct = 50, iti = 80, timeout = 3000, track = 'ink'} = {}) {
    super({ element: "div", name: "stroop" });
    // this.setAttr({ class: "wrap" });

    this.colors = [
        { name: "red", display: "RED", css: "#ef4444", key: "r" },
        { name: "green", display: "GREEN", css: "#10b981", key: "g" },
        { name: "blue", display: "BLUE", css: "#3b82f6", key: "b" },
        { name: "yellow", display: "YELLOW", css: "#f59e0b", key: "y" },
      ]
    this.colorSetManager = new ColorSetManager();
    this.trialGenerator = new TrialGenerator(this.colors);

    this.stimulus = div("Press Start").setAttr({
      class: "stimulus",
      "aria-live": "polite",
    });

    this.total_trials = stat("Trials: 0");
    this.avg_rt = stat("Avg RT: — ms");
    this.accuracy = stat("Accuracy: — %");

    this.result_sumary = div(
      this.total_trials,
      this.avg_rt,
      this.accuracy,
    ).setAttr({ class: "results-summary" });

    this.picker = div()

    this.append(
      div(this.stimulus, this.result_sumary).setAttr({
        class: "card",
        role: "main",
        "aria-labelledby": "title",
      }),
    );
    this.state = {
      running: false,
      trialIndex: 0,
      trials: [],
      results: [],
      startTime: null,
      awaiting: false,
      timeoutId: null,
      config: new StroopConfig(
        trials,
        congruentPct,
        iti,
        timeout,
        track,
      ),
    };

    document.addEventListener('keydown', e => this.#handleKeyPress(e));
  }

  start() {
    if (this.state.running) return this;
    this.state.running = true;
    this.state.trialIndex = 0;
    this.state.results = [];

    this.state.trials = this.trialGenerator.generateTrials(
      this.state.config.trials,
      this.state.config.congruentPct,
    );
    this.#updateSummary(this.state.results, this.state.trials.length);
    setTimeout(() => this.runNextTrial(), 300);
    return this;
  }

  stop() {
    this.state.running = false;
    this.state.awaiting = false;
    this.#clearStimulus();
  }

  runNextTrial() {
    if (!this.state.running) return this;
    if (this.state.trialIndex >= this.state.trials.length) return this.stop();

    const trial = this.state.trials[this.state.trialIndex];
    this.state.awaiting = true;

    this.#updateStimulus(trial, this.colorSetManager.getCurrentSet());
    // console.log(
    //  this.colorSetManager.getCurrentSet() 
    // )
    this.state.startTime = performance.now();

    this.state.timeoutId = setTimeout(() => {
      this.recordResponse({
        rt: this.state.config.timeout,
        correct: false,
        timedOut: true,
      });
    }, this.state.config.timeout);
  }

  recordResponse({ rt, correct, timedOut = false, selected = null }) {
    if (!this.state.running || !this.state.awaiting) return;

    clearTimeout(this.state.timeoutId);
    this.state.awaiting = false;

    const trial = this.state.trials[this.state.trialIndex];
    const result = new TrialResult(
      this.state.trialIndex + 1,
      trial,
      rt,
      correct,
      timedOut,
      selected,
      this.state.config.track,
    );

    this.state.results.push(result);
    // this.ui.pagination.render();
    this.#updateSummary(this.state.results, this.state.trials.length);

    this.state.trialIndex++;
    this.#blinkBlank(200).then(() => {
      setTimeout(() => this.runNextTrial(), this.state.config.iti);
    });
  }

  #handleKeyPress(e) {
    if (!this.state.running || !this.state.awaiting) return;
    const color = this.colorSetManager.getCurrentSet().getColorByKey(e.key);
    if (!color) return;

    const rt = performance.now() - this.state.startTime;
    const trial = this.state.trials[this.state.trialIndex];

    // ✅ Compare based on configured track mode
    const correctTarget = this.state.config.track === "ink" ? trial.ink : trial.word.toLowerCase();
    const userAnswer = this.state.config.track === "ink" ? color.name : color.display.toLowerCase();

    this.recordResponse({ rt, correct: userAnswer === correctTarget, selected: userAnswer });

    console.log(correctTarget === userAnswer)
  }

  #updateStimulus(trial, colorSet) {
    const c = colorSet.getColorByName(trial.ink) || colorSet.getAllColors()[0];
    this.stimulus.element.textContent = trial.word;
    this.stimulus.style({
      color: c.css,
      opacity: 1,
    });
  }
  #clearStimulus() {
    this.stimulus.element.textContent = "";
  }
  #blinkBlank(ms = 250) {
    return new Promise((res) => {
      this.stimulus.style({ opacity: "0.15" });
      setTimeout(() => {
        this.#clearStimulus();
        this.stimulus.style({ opacity: "1" });
        res();
      }, ms);
    });
  }
  #updateSummary(results, totalTrials) {
    const n = results.length;
    this.total_trials.element.textContent = `Trials: ${n} / ${totalTrials}`;
    if (n === 0) {
      this.avg_rt.element.textContent = `Avg RT: — ms`;
      this.accuracy.element.textContent = `Accuracy: — %`;
      return;
    }

    const valid = results.filter((r) => r.isValid());
    const avgRT = valid.length
      ? Math.round(valid.reduce((s, r) => s + r.rt, 0) / valid.length)
      : 0;
    const acc = Math.round((results.filter((r) => r.correct).length / n) * 100);

    this.avg_rt.element.textContent = `Avg RT: ${avgRT} ms`;
    this.accuracy.element.textContent = `Accuracy: ${acc} %`;
  }
}

const stat = (text) => tags.div(text).setAttr({ class: "stat" });

const Stroop = () => new UIStroop();
export { UIStroop, Stroop };
