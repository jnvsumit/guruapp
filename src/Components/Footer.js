import Logo from '../assets/logo.png'

const Footer = (props) => {
    return (
        <div className="bg-dark text-light">
            <div className="row p-5">
                <div className="col-md-7">
                    <div className="row">
                        <h1 className="display-6">About</h1>
                        <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <p className="lead text-muted">Phone: +91 9999999999</p>
                        <p className="lead text-muted">Email: example@gamil.com</p>
                    </div>
                </div>
                <div className="col-md-3 text-center">
                    <div className="row mt-5">
                        <a href="#" className="display-6 text-light" style={{textDecoration: "none"}}>Home</a>
                    </div>
                    <div className="row py-5">
                        <a href="#" className="display-6 text-light" style={{textDecoration: "none"}}>About</a>
                    </div>
                </div>
                <div className="col-md-2 mr-auto text-center">
                    <img src={Logo} width="200px" height="200px"/>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;