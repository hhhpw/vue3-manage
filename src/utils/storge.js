class LocalStorage {
  getItem(key) {
    return localStorage.getItem(`bxmg${key}`) || null;
  }

  setItem(key, value) {
    localStorage.setItem(`bxmg${key}`, value);
  }

  removeItem(key) {
    localStorage.removeItem(`bxmg${key}`);
  }

  clear() {
    localStorage.clear();
  }
}

export default new LocalStorage();
