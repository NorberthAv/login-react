import logo from './../logo.svg';

export function Body() {
    return <>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div class='main row'>
            <div className='col-2'>
            <nav class="nav flex-column">
            <a class="nav-link active" href="#">Active</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link disabled">Disabled</a>
            </nav>
        
            </div>
            
            <div className='prueba-cc col-10'>
                <h1>HEADDD</h1>



            </div>
        </div>


    </>
}