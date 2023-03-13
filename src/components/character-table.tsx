import { useEffect, useState } from "react";
import { Character, getCharacters } from "../api/character-requests";
import ".././styles/styles.css";
import { NavBar } from "./navbar";

export function CharacterTable() {

    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        (async () => {
            const retrievedCharacters = await getCharacters();
            setCharacters(retrievedCharacters)
        })();

    }, []);

    return <>
        <NavBar />
        <div className="pageContainer">
            <h2>Characters</h2>
            <table>
                <thead>
                    <tr>
                        <th></th> <th>ID</th> <th>Name</th> <th>Job</th> <th>Weapon</th><th></th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(c =>
                        <tr>
                            <td style={{ width: '10px' }}>
                                {c.favorite && <img src={require('.././styles/star.png')} alt="star" style={{ height: '13px' }} />}
                            </td>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.job}</td>
                            <td>{c.weapon}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </>

}