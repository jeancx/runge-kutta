'use strict'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = { x: 0.0, y: 1.0, fn: 'x * Math.sqrt(y)', h: 0.1, result: [] }
    this.handleChange = this.handleChange.bind(this)
    this.solve = this.solve.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    const newState = {}
    newState[name] = value
    this.setState(newState)
  }

  solve () {
    this.setState({
      result: RungeKutta.solve(
        parseFloat(this.state.x),
        parseFloat(this.state.y),
        parseFloat(this.state.h),
        this.state.fn
      )
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-12'>
                <h2>Runge Kutta 4º Ordem:</h2>
              </div>
            </div>
            <div className={'row'}>
              <div className='form-group col-sm-4'>
                <div className="input-group">
                  <div className="input-group-addon">X:</div>
                  <input type="number" className="form-control" name='x' value={this.state.x}
                         onChange={this.handleChange}/>
                </div>
              </div>
              <div className='form-group col-sm-4'>
                <div className="input-group">
                  <div className="input-group-addon">Y:</div>
                  <input type="number" className="form-control" name='y' value={this.state.y}
                         onChange={this.handleChange}/>
                </div>
              </div>
              <div className='form-group col-sm-4'>
                <div className="input-group">
                  <div className="input-group-addon">H:</div>
                  <input type="number" className="form-control" name='h' value={this.state.h}
                         onChange={this.handleChange}/>
                </div>
              </div>
            </div>
            <div className={'row'}>
              <div className='form-group col-sm-9 col-md-10'>
                <div className="input-group">
                  <div className="input-group-addon">FN:</div>
                  <input type="text" className="form-control" name='fn' value={this.state.fn}
                         onChange={this.handleChange}/>
                </div>
              </div>
              <div className='col-sm-3 col-md-2'>
                <button onClick={this.solve} className='btn btn-block btn-primary' type='button'>Resolver</button>
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-12 text-center'>
                <table className='table table-bordered result'>
                  <thead>
                    <tr>
                      <th/>
                      <th>X</th>
                      <th>Y</th>
                      <th>K1</th>
                      <th>K2</th>
                      <th>K3</th>
                      <th>K4</th>
                      <th>Erro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.result.length > 0 ?
                      this.state.result.map((row, index) => (
                        <tr key={index}>
                          <td><span>{index}</span></td>
                          <td><span>{row.x}</span></td>
                          <td><span>{row.y}</span></td>
                          <td><span>{row.k1}</span></td>
                          <td><span>{row.k2}</span></td>
                          <td><span>{row.k3}</span></td>
                          <td><span>{row.k4}</span></td>
                          <td><span>{row.error}</span></td>
                        </tr>
                      ))
                      : (
                        <tr>
                          <td colSpan={8}><span>Nenhum resultado.</span></td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>

            <div className='row'>
              <fieldset>
                <legend>Legenda:</legend>

                <table className="table legend">
                  <tbody>
                    <tr>
                      <td>X[i]</td>
                      <td><math>X + (H * i)</math></td>
                    </tr>
                    <tr>
                      <td>Y[i]</td>
                      <td><math>Y[i] + (K1[i] + (2 * K2[i]) + (2 * K3[i]) + K4[i]) / 6</math></td>
                    </tr>
                    <tr>
                      <td>K1[i]</td>
                      <td><math>H * FN(X, Y[i])</math></td>
                    </tr>
                    <tr>
                      <td>K2[i]</td>
                      <td><math>H * FN(X = (X + H / 2), Y = (+Y[i] + K1[i] / 2))</math></td>
                    </tr>
                    <tr>
                      <td>K3[i]</td>
                      <td><math>H * FN(X = (X + H / 2), Y = (+Y[i] + K2[i] / 2))</math></td>
                    </tr>
                    <tr>
                      <td>K4[i]</td>
                      <td><math>H * FN(X = (X + H), Y = (+Y[i] + K3[i]))</math></td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
