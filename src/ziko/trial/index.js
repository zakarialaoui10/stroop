class Trial {
  constructor(word, ink, congruent) {
    this.word = word;
    this.ink = ink;
    this.congruent = congruent;
  }
}

class TrialResult {
  constructor(index, trial, rt, correct, timedOut, selected, track) {
    this.index = index;
    this.word = trial.word;
    this.ink = trial.ink;
    this.type = trial.congruent ? 'congruent' : 'incongruent';
    this.rt = Math.round(rt);
    this.correct = correct;
    this.timedOut = timedOut;
    this.selected = selected;
    this.tracked = track; // "ink" or "word"
  }
  isValid() { return !this.timedOut; }
}

class TrialGenerator {
  constructor(colors) {
    // this.colorSetManager = colorSetManager;
    this.colors = colors
  }

  generateTrials(count, congruentPercent) {
    const trials = [];
    const congruentCount = Math.round(count * congruentPercent / 100);
    const incongruentCount = count - congruentCount;
    // const colors = this.colorSetManager.getCurrentSet().getAllColors();
    const colors = this.colors

    for (let i = 0; i < congruentCount; i++) {
      const c = colors[Math.floor(Math.random() * colors.length)];
      trials.push(new Trial(c.display, c.name, true));
    }

    for (let i = 0; i < incongruentCount; i++) {
      let w = Math.floor(Math.random() * colors.length);
      let ink = Math.floor(Math.random() * colors.length);
      if (ink === w) ink = (ink + 1) % colors.length;
      trials.push(new Trial(colors[w].display, colors[ink].name, false));
    }

    return this.shuffle(trials);
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

export {
    Trial,
    TrialResult,
    TrialGenerator
}