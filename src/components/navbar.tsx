import { Link } from "react-router-dom";
import ".././styles/styles.css";


export function NavBar() {

    return <div style={{ backgroundColor: "#0085fc", color: "white", height: "50px", padding: "5px" }}>
        <ul>
            <li className="navBarItem"><Link to="/">Characters</Link></li>
            <li className="navBarItem"><Link to="/createcharacter">Create a Character</Link></li>
            <li className="navBarItem"><Link to="/deletecharacter">Delete a Character</Link></li>
            <li className="navBarItem"><Link to="/updatecharacter">Edit a Character</Link></li>
            <li className="navBarItem"><Link to="/charactersearch">Search for a Character</Link></li>
            <li className="navBarItem"><Link to="/charactersfilter">Filtered Search</Link></li>
        </ul>

    </div>
}

