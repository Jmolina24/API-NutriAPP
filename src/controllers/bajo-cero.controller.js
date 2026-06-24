import fs from 'fs/promises';
import crypto from 'crypto';

const { tokenSign } = require('../middleware/tokeAuth');

export const createUserController = async (req, res) => {

    const { nombre, apellido, tipo_documento, num_documento, email, telefono, user, password } = req.body;

    if (!nombre || !apellido || !tipo_documento || !num_documento || !email || !telefono || !user || !password) {
        return res.status(400).json({ code: "1", message: "Datos inválidos" });
    }

    try {
        const users = JSON.parse(await fs.readFile('./src/json/users.json', 'utf8'));
        const existingUser = users.find(u => u.num_documento === num_documento || u.email === email || u.user === user);

        if (existingUser) {
            return res.status(409).json({ code: "1", message: "El Usuario ya se encuentra registrado" });
        }

        const newUser = { id: crypto.randomUUID(), ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        users.push(newUser);
        await fs.writeFile('./src/json/users.json', JSON.stringify(users, null, 2), 'utf8');
        return res.status(201).json({ code: "0", message: "Usuario creado correctamente", data: newUser });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "createUserController", details: error });
    }
};

export const loginUserController = async (req, res) => {
    const { user, password } = req.body;
    const users = JSON.parse(await fs.readFile('./src/json/users.json', 'utf8'));
    try {
        const existingUser = users.find(u => u.user === user && u.password === password);
        if (existingUser) {
            const tokenSession = await tokenSign(existingUser.id);
            const userData = { id: existingUser.id, nombre: existingUser.nombre, apellido: existingUser.apellido, token: tokenSession };
            return res.status(200).json({ code: "0", message: "Login exitoso", data: userData });
        }
        return res.status(401).json({ code: "1", message: "Usuario o contraseña incorrectos" });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "loginUserController", details: error });
    }





}


export const listServicesController = async (req, res) => {
    try {
        const services = JSON.parse(await fs.readFile('./src/json/services.json', 'utf8'));
        return res.status(200).json({ code: "0", message: "Lista de servicios obtenida correctamente", data: services });
    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listServicesController", details: error });
    }
}

export const createServicesController = async (req, res) => {

    const {
        icon,
        color,
        title,
        desc,
        items,
        active
    } = req.body;

    try {

        if (!icon || !color || !title || !desc || !Array.isArray(items) || items.length === 0 || typeof active !== 'boolean') {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        let services = JSON.parse(await fs.readFile('./src/json/services.json', 'utf8'));
        const existingService = services.find(service => service.title.toLowerCase() === title.toLowerCase());
        if (existingService) {
            return res.status(409).json({ code: "1", message: "El servicio ya existe" });
        }

        const newService = {
            id: crypto.randomUUID(),
            icon,
            color,
            title,
            desc,
            items,
            active,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        services.push(newService);
        await fs.writeFile('./src/json/services.json', JSON.stringify(services, null, 2), 'utf8');
        return res.status(201).json({ code: "0", message: "Servicio creado correctamente", data: newService });


    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "createServicesController", details: error });
    }
}


export const putServicesController = async (req, res) => {


    const { id } = req.params;
    const { icon, color, title, desc, items, active } = req.body;


    try {

        if (!icon || !color || !title || !desc || !Array.isArray(items) || items.length === 0 || typeof active !== 'boolean') {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        let services = JSON.parse(await fs.readFile('./src/json/services.json', 'utf8'));

        const index = services.findIndex(service => service.id === id);

        if (index === -1) {
            return res.status(404).json({ code: "1", message: "Servicio no encontrado" });
        }

        const updatedService = {
            id,
            icon,
            color,
            title,
            desc,
            items,
            active,
            updatedAt: new Date().toISOString()
        };

        services[index] = updatedService;

        await fs.writeFile('./src/json/services.json', JSON.stringify(services, null, 2), 'utf8');

        return res.status(200).json({ code: "0", message: "Servicio actualizado correctamente", data: updatedService });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "putServicesController", details: error });
    }
}


export const toggleServicesController = async (req, res) => {
    const { id } = req.params;

    try {
        let services = JSON.parse(await fs.readFile('./src/json/services.json', 'utf8'));
        const index = services.findIndex(service => service.id === id);

        if (index === -1) {
            return res.status(404).json({ code: "1", message: "Servicio no encontrado" });
        }

        // Cambiar el estado actual
        services[index].active = !services[index].active;

        await fs.writeFile('./src/json/services.json', JSON.stringify(services, null, 2), 'utf8');
        return res.status(200).json({ code: "0", message: "Estado del servicio actualizado correctamente", data: services[index] });

    } catch (error) {

        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "toggleServicesController", details: error });

    }





};

export const deleteServicesController = async (req, res) => {
    const { id } = req.params;

    try {
        let services = JSON.parse(await fs.readFile('./src/json/services.json', 'utf8'));
        const index = services.findIndex(service => service.id === id);

        if (index === -1) {
            return res.status(404).json({ code: "1", message: "Servicio no encontrado" });
        }

        // Obtener el servicio eliminado (opcional)
        const deletedService = services[index];

        // Eliminar del arreglo
        services.splice(index, 1);
        // Guardar cambios
        await fs.writeFile('./src/json/services.json', JSON.stringify(services, null, 2), 'utf8');

        return res.status(200).json({ code: "0", message: "Servicio eliminado correctamente", data: deletedService });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "deleteServicesController", details: error });
    }
};


export const listStepsController = async (req, res) => {
    try {
        const services = JSON.parse(await fs.readFile('./src/json/seccion.json', 'utf8'));
        return res.status(200).json({ code: "0", message: "Lista de secciones obtenida correctamente", data: services });
    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listStepsController", details: error });
    }
}


export const createStepsController = async (req, res) => {

    const { num, icon, title, descripcion } = req.body;

    try {
        if (!num || !icon || !title || !descripcion) {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        let services = JSON.parse(await fs.readFile('./src/json/seccion.json', 'utf8'));
        const existingSeccion = services.find(service => service.title.toLowerCase() === title.toLowerCase() || service.num === num);
        if (existingSeccion) {
            return res.status(409).json({ code: "1", message: "La sección ya existe" });
        }

        const newSeccion = {
            id: crypto.randomUUID(),
            num,
            icon,
            title,
            descripcion,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        services.push(newSeccion);
        await fs.writeFile('./src/json/seccion.json', JSON.stringify(services, null, 2), 'utf8');
        return res.status(201).json({ code: "0", message: "Sección creada correctamente", data: newSeccion });


    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "createStepsController", details: error });
    }
}

export const putStepsController = async (req, res) => {

    const { id } = req.params;
    const { num, icon, title, descripcion } = req.body;

    try {

        if (!num || !icon || !title || !descripcion) {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        let secciones = JSON.parse(await fs.readFile('./src/json/seccion.json', 'utf8'));

        const index = secciones.findIndex(section => section.id === id);

        if (index === -1) {
            return res.status(404).json({ code: "1", message: "Sección no encontrada" });
        }

        const updatedSection = {
            ...secciones[index],
            num,
            icon,
            title,
            descripcion,
            updatedAt: new Date().toISOString()
        };

        secciones[index] = updatedSection;

        await fs.writeFile('./src/json/seccion.json', JSON.stringify(secciones, null, 2), 'utf8');

        return res.status(200).json({ code: "0", message: "Sección actualizada correctamente", data: updatedSection });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "putStepsController", details: error });
    }
}


export const deleteStepsController = async (req, res) => {
    const { id } = req.params;

    try {
        let secciones = JSON.parse(await fs.readFile('./src/json/seccion.json', 'utf8'));
        const index = secciones.findIndex(section => section.id === id);

        if (index === -1) {
            return res.status(404).json({ code: "1", message: "Sección no encontrada" });
        }

        const deletedService = secciones[index];
        secciones.splice(index, 1);
        await fs.writeFile('./src/json/seccion.json', JSON.stringify(secciones, null, 2), 'utf8');

        return res.status(200).json({ code: "0", message: "Sección eliminada correctamente", data: deletedService });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "deleteStepsController", details: error });
    }
};


export const listContactController = async (req, res) => {
    try {
        const services = JSON.parse(await fs.readFile('./src/json/contact.json', 'utf8'));
        return res.status(200).json({ code: "0", message: "Lista de contactos obtenida correctamente", data: services });
    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "listContactController", details: error });
    }
}


export const putContactController = async (req, res) => {

    const { id } = req.params;
    const { whatsapp, phone, email, city, schedule } = req.body;
    try {

        if (!whatsapp || !phone || !email || !city || !schedule) {
            return res.status(400).json({ code: "1", message: "Datos inválidos" });
        }

        let contact = JSON.parse(await fs.readFile('./src/json/contact.json', 'utf8'));

        const index = contact.findIndex(item => item.id === id);

        if (index === -1) {
            return res.status(404).json({ code: "1", message: "Contacto no encontrado" });
        }

        const updatedSection = {
            ...contact[index],
            whatsapp,
            phone,
            email,
            city,
            schedule,
            updatedAt: new Date().toISOString()
        };

        contact[index] = updatedSection;

        await fs.writeFile('./src/json/contact.json', JSON.stringify(contact, null, 2), 'utf8');

        return res.status(200).json({ code: "0", message: "Contacto actualizado correctamente", data: updatedSection });

    } catch (error) {
        return res.status(500).json({ code: "1", message: "Internal Server Error", error: "putContactController", details: error });
    }
}