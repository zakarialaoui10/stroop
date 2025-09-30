export class StroopConfig {
  constructor(trials = 40, congruentPct = 50, iti = 800, timeout = 4000, track = "ink") {
    this.trials = trials;
    this.congruentPct = congruentPct;
    this.iti = iti;
    this.timeout = timeout;
    this.track = track; // "ink" or "word"
  }
  validate() {
    this.trials = Math.max(4, this.trials);
    this.congruentPct = Math.min(100, Math.max(0, this.congruentPct));
    this.iti = Math.max(100, this.iti);
    this.timeout = Math.max(300, this.timeout);
    if (!["ink", "word"].includes(this.track)) this.track = "ink";
  }
}