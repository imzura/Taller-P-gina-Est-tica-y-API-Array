const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

const sales = [
    { id: 1, invoiceNumber: 'INV001', unitsNumber: 10, clientName: 'Joan of Arc', totalValue: 500 },
    { id: 2, invoiceNumber: 'INV002', unitsNumber: 5, clientName: 'Policarpa Salavarrieta', totalValue: 250 },
    { id: 3, invoiceNumber: 'INV003', unitsNumber: 20, clientName: 'Tutankhamun', totalValue: 1000 },
    { id: 4, invoiceNumber: 'INV004', unitsNumber: 7, clientName: 'Socrates', totalValue: 350 },
    { id: 5, invoiceNumber: 'INV005', unitsNumber: 12, clientName: 'Simón Bolívar', totalValue: 600 }
];

// 2. Método GET que retorna la suma total de número de unidades facturadas
app.get('/total-units', (req, res) => {
    let totalUnits = 0;
    for (const sale of sales) {
        totalUnits += sale.unitsNumber;
    }
    res.json({ totalUnits });
});

// 3. Método GET que retorna el valor total facturado
app.get('/total-value', (req, res) => {
    let totalValue = 0;
    for (const sale of sales) {
        totalValue += sale.totalValue;
    }
    res.json({ totalValue });
});

// 4. Método GET que retorna los datos de una factura de venta por ID
app.get('/invoice/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const invoice = sales.find(s => s.id === id);
    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404).json({ error: 'Invoice not found' });
    }
});

// 5. Método GET que retorna un JSON con el ID y el nombre del cliente
app.get('/clients', (req, res) => {
    const clients = sales.map(s => ({ id: s.id, clientName: s.clientName }));
    res.json(clients);
});

// 6. Método POST para insertar facturas
app.post('/invoice', (req, res) => {
    const newInvoice = req.body;
    sales.push(newInvoice);
    res.status(201).json(newInvoice);
});

// 7. Método PUT para realizar un decremento del valor total entre 1 y 10%
app.put('/discount', (req, res) => {
    const { percentage } = req.body;
    if (percentage < 1 || percentage > 10) {
        return res.status(400).json({ error: 'Percentage must be between 1 and 10' });
    }
    for (const sale of sales) {
        sale.totalValue -= (sale.totalValue * percentage / 100);
    }
    res.json({ message: 'Values updated' });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
