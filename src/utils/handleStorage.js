export function saveUserToLocal (query = {}) {
  for (let key in query) {
    if (query.hasOwnProperty(key)) {
      localStorage.setItem(key, query[key])
    }
  }
}

export function hasFieldsInLocal (...keys) {
  return keys.every(key => !!localStorage.getItem(key))
}

