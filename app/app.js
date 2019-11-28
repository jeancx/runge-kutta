'use strict'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = { x: 0.0, y: 1.0, fn: 'x * Math.sqrt(y)', dx: 0.1, result: [] }
    this.handleChange = this.handleChange.bind(this)
    this.solve = this.solve.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    const newState = {}
    newState[name] = parseFloat(value)
    this.setState(newState)
  }

  solve () {
    this.setState({ result: RungeKutta.solve(this.state.x, this.state.y, this.state.dx, this.state.fn) })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='row'>
              <div className='col-md-12'>
                <h2>Runge Kutta:</h2>
              </div>
            </div>
            <div className={'row'}>
              <div className='form-group col-md-8'>
                <div className="input-group">
                  <div className="input-group-addon">FN:</div>
                  <input type="text" className="form-control" name='fn' value={this.state.fn}
                         onChange={this.handleChange}/>
                </div>
              </div>
              <div className='form-group col-md-4'>
                <div className="input-group">
                  <div className="input-group-addon">DX:</div>
                  <input type="number" className="form-control" name='dx' value={this.state.dx}
                         onChange={this.handleChange}/>
                </div>
              </div>
            </div>
            <div className={'row'}>
              <div className='form-group col-md-5'>
                <div className="input-group">
                  <div className="input-group-addon">X:</div>
                  <input type="number" className="form-control" name='x' value={this.state.x}
                         onChange={this.handleChange}/>
                </div>
              </div>
              <div className='form-group col-md-5'>
                <div className="input-group">
                  <div className="input-group-addon">Y:</div>
                  <input type="number" className="form-control" name='y' value={this.state.y}
                         onChange={this.handleChange}/>
                </div>
              </div>
              <div className='col-md-2'>
                <button onClick={this.solve} className='btn btn-block btn-primary' type='button'>Resolver</button>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12 text-center'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>X</th>
                      <th>Y</th>
                      <th>Erro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.result.length > 0 ?
                      this.state.result.map((row, index) => (
                        <tr key={index}>
                          <td><span>{row.x}</span></td>
                          <td><span>{row.y}</span></td>
                          <td><span>{row.error}</span></td>
                        </tr>
                      ))
                      : (
                        <tr>
                          <td colSpan={3}><span>Nenhum resultado.</span></td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
