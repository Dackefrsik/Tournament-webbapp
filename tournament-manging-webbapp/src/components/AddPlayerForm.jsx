


function AddPlayerForm(){


    return(
        <form action="" className="form-group">
            <div className="d-flex flex-column">
                <div className="row">
                    <div className="col-8">
                        <div className="form-floating">
                            <input type="text" name="Name" className="mb-2 form-control" id="Name" placeholder="Namm"/>
                            <label htmlFor="Name">Namn</label>
                        </div>
                    </div>
                    <div className="col-4">
                        <input type="submit" value="Add" className="mb-2 form-control btn btn-success btn-lg" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddPlayerForm;