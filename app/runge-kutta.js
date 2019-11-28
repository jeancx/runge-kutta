function rk4 (x, y, h, fn) {
  const k1 = h * eval_fn(x, y, fn)
  const k2 = h * eval_fn(x + h / 2.0, +y + k1 / 2.0, fn)
  const k3 = h * eval_fn(x + h / 2.0, +y + k2 / 2.0, fn)
  const k4 = h * eval_fn(x + h, +y + k3, fn)

  return { k1, k2, k3, k4, result: y + (k1 + (2.0 * k2) + (2.0 * k3) + k4) / 6.0 }
}

function eval_fn (x, y, fn) {
  return eval(fn)
}

function error (x, y) {
  return (((1 / 16) * (x * x + 4) * (x * x + 4)) - y).toExponential()
}

class RungeKutta {
  static solve (x = 0.0, y = 1.0, h = 0.1, fn) {
    let steps = 0, rk4Result, k1 = 0, k2 = 0, k3 = 0, k4 = 0, result = []
    const maxSteps = 101

    while (steps < maxSteps) {
      result.push({ x, y, k1, k2, k3, k4, error: error(x, y) })

      rk4Result = rk4(x, y, h, fn)
      k1 = rk4Result.k1
      k2 = rk4Result.k2
      k3 = rk4Result.k3
      k4 = rk4Result.k4
      y = rk4Result.result
      x = ((x * 10) + (h * 10)) / 10
      steps += 1
    }

    return result
  }
}
