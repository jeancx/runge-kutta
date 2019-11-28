function rk4 (x, y, dx, fn) {
  const k1 = dx * eval_fn(x, y, fn)
  const k2 = dx * eval_fn(x + dx / 2.0, +y + k1 / 2.0, fn)
  const k3 = dx * eval_fn(x + dx / 2.0, +y + k2 / 2.0, fn)
  const k4 = dx * eval_fn(x + dx, +y + k3, fn)

  return y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0
}

function eval_fn (x, y, fn) {
  return eval(fn)
}

function error (x, y) {
  return (((1 / 16) * (x * x + 4) * (x * x + 4)) - y).toExponential()
}

class RungeKutta {
  static solve (x = 0.0, y = 1.0, fn, dx) {
    let steps = 0
    const maxSteps = 101, sampleEveryN = 10
    let result = []

    while (steps < maxSteps) {
      if (steps % sampleEveryN === 0) {
        result.push({ x, y, error: error(x, y) })
      }

      y = rk4(x, y, dx, fn)
      x = ((x * 10) + (step * 10)) / 10
      steps += 1
    }

    return result
  }
}
