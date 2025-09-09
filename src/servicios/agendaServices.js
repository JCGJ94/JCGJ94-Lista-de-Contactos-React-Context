const agendaServices = {}
const url = 'https://playground.4geeks.com/contact';
const username = 'JoseC';

// funcion async crear nuevo usuario
agendaServices.newUsers = async () => {
    try {
        const resp = await fetch(url + '/agendas/' + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!resp.ok) throw new Error('error fetching agendas users')
        const data = await resp.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

// funcion async para obtner agendas creadas
agendaServices.getUserAgendas = async () => {
    try {
        const resp = await fetch(url + '/agendas/' + username)
        if (!resp.ok) throw new Error('error fetching agendas slug')
        const data = await resp.json();
        return data
    } catch (error) {
        console.log(error)
        agendaServices.newUsers()
    }
}

// funcion async para crear agenda obteniedo datos del imput
agendaServices.newContact = async (slug, contactData) => {
    try {
        const resp = await fetch(url + "/agendas/" + slug + "/contacts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": contactData.name,
                "phone": contactData.phone,
                "email": contactData.email,
                "address": contactData.address
            })
        });
        console.log(resp)
        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }
        const data = await resp.json();
        console.log(data)
        return data;

    } catch (error) {
        console.log('My error ', error);
    }
};
// funcion async para delete 
agendaServices.deleteContacts = async (slug, id) => {
    try {
        const resp = await fetch(url + "/agendas/" + slug + '/contacts/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!resp.ok) { throw new Error(`Error ${resp.status}`) };
        return true
    } catch (error) {
        console.log(error)
    }
}
// funcion async para actualizar
agendaServices.updateContacts = async (slug, id, contactData) => {
    try {
        const resp = await fetch(url + "/agendas/" + slug + '/contacts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": contactData.name,
                "phone": contactData.phone,
                "email": contactData.email,
                "address": contactData.address
            })
        })
        if (!resp.ok) { throw new Error(`Error ${resp.status}`) };
        return true
    } catch (error) {
        console.log(error)
    }
}


export default agendaServices;