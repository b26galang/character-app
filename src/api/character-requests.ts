// same types in Java Object
export type Character = {
    id: number,
    name: string,
    job: string,
    weapon: string,
    favorite: boolean,
}

export type CharacterCreation = {
    name: string,
    job: string,
    weapon: string,
    favorite: boolean,
}

export type CharacterDetailsUpdate = {
    id: number,
    name: string,
    job: string,
    weapon: string,
    favorite: boolean,
}

export type CharacterIdentifier = {
    idToSearch?: number,
    nameToSearch?: string
}

export type CharacterJob = {
    jobToSearch?: string;
}

export type Characters = Character[];

// can change url in just spot
export const url = "http://127.0.0.1:8081";

// retrieve all characters for character-table
export async function getCharacters(): Promise<Character[]> {
    const response = await (await (fetch(`${url}/characters`))).json()
    return response;
}

// search character by job
export async function getCharactersByJob(props: CharacterJob): Promise<Character[]> {
    const response = await fetch(`${url}/characters?flag=${props.jobToSearch}`);
    const characters: Character[] = await response.json();
    return characters;
  }

// character creation
export async function createCharacter(character: CharacterCreation): Promise<Character> {
    const response = await fetch(`${url}/characters`, {
        method: "POST",
        body: JSON.stringify(character),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const newCharacter: Character = await response.json();
    return newCharacter;
}

// search character by ID or name
export async function getCharacterByIdentifier(props: CharacterIdentifier): Promise<Character | null> {
    const idOrNameToSearch = props.idToSearch || props.nameToSearch;
    const response = await fetch(`${url}/characters/${idOrNameToSearch}`);
    // if response is not successful return null because no character is being retrieved
    if (!response.ok) {
        alert('No character was found with that identifier')
        return null;
    }
    const character: Character | null = await response.json();
    return character;
}

// update/edit a character
export async function updateCharacterDetails(character: CharacterDetailsUpdate): Promise<Character> {

    const response = await fetch(`${url}/characters`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
    });

    const updatedCharacter: Character = await response.json();
    return updatedCharacter;
}

// delete a character
export async function deleteCharacter(id: number): Promise<void> {
    await fetch(`${url}/characters/${id}`, {
        method: 'DELETE',
    });
}