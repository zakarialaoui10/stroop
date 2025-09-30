class ColorSet {
  constructor(name, colors) {
    this.name = name;
    this.colors = colors;
  }
  getColorByKey(key) {
    return this.colors.find((c) => c.key === key.toLowerCase());
  }
  getColorByName(name) {
    return this.colors.find((c) => c.name === name);
  }
  getAllColors() {
    return [...this.colors];
  }
  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}

class ColorSetManager {
  constructor() {
    this.colorSets = {
      default: new ColorSet("default", [
        { name: "red", display: "RED", css: "#ef4444", key: "r" },
        { name: "green", display: "GREEN", css: "#10b981", key: "g" },
        { name: "blue", display: "BLUE", css: "#3b82f6", key: "b" },
        { name: "yellow", display: "YELLOW", css: "#f59e0b", key: "y" },
      ]),
    };
    this.currentSet = this.colorSets.default;
  }

  setColorSet(name) {
    if (this.colorSets[name]) {
      this.currentSet = this.colorSets[name];
      return true;
    }
    return false;
  }

  getCurrentSet() {
    return this.currentSet;
  }
}

export { ColorSet, ColorSetManager };
