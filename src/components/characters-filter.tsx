import { useState } from "react";
import { getCharactersByJob, Characters } from "../api/character-requests";
import { NavBar } from "./navbar";


export function CharactersFilter() {

    const [job, setJob] = useState('');
    const [characters, setCharacters] = useState<Characters>([]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJob(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let userInput = { jobToSearch: job }
        const retrievedCharacters = await getCharactersByJob(userInput);
        setCharacters(retrievedCharacters);
    };

    return <>
        <NavBar />
        <div className="pageContainer">
            <h2>Search characters by job</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={job} onChange={handleInput} required /> <button type="submit">Search</button>
            </form> 
            {characters != null && characters.length > 0 &&
                <>
                    <h2>Characters</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th> <th>ID</th> <th>Name</th> <th>Job</th> <th>Weapon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {characters.map(c =>
                                <tr key={c.id}>
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
                </>
            }
        </div>
    </>
}