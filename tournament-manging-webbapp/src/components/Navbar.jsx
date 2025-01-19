import CreateTornamentModalBody from "./CreateTornamenModalBody";

function Navbar(){
    return (
        <div className="container-fluid ">
            <nav className="navbar navbar-expand-lg bg-success-subtle">
            <div className="container-fluid">
                <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item mt-2 me-1 ms-auto">
                            <div id="createTournament" className="btn bg-primary text-white" data-bs-toggle="modal" data-bs-target="#ModalCreateTournament">Create new tournament</div>
                        </li>
                        <li className="navbar-item mt-2 me-1 ms-auto">
                            <div className="btn bg-primary text-white">Manage tournament</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="modal fade" id="ModalCreateTournament" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header bg-primary">
                <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Create tornament</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <CreateTornamentModalBody/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Create tournament</button>
            </div>
            </div>
        </div>
        </div>
      </div>
    );
}

export default Navbar;