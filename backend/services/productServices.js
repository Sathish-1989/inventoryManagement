const {
    get
} = require('request');
var db = require('../database');
const easyinvoice = require('easyinvoice'); // Install it using `npm install easyinvoice`
const fs = require('fs'); // For saving the invoice locally


// this function gets the all brand details from the database
const getAllBrand = async (req, res) => {
    try {
        const brandquery = "SELECT * FROM brand_master";

        // Get a connection from the db and execute the query
        const [results] = await db.query(brandquery);

        // Send the results as JSON
        res.status(200).json(results);
    } catch (error) {
        console.error('Error Retrieving brands:', error);
        res.status(500).send('Error retrieving brands');
    }
};

// this function is to get all category details from the database
const getAllCategory = async (req, res) => {
    try {
        const catquery = "SELECT * FROM category_master";

        // Get a connection from the db and execute the query
        const [results] = await db.query(catquery);

        // Send the results as JSON
        res.status(200).json(results);
    } catch (error) {
        console.error('Error Retrieving Category:', error);
        res.status(500).send('Error retrieving Category');
    }
};


// this function will add the new product record into the database
const addproduct = async (req, res) => {
    const getData = req.body;
    var insertQuery = "INSERT INTO product_master(product_name,category_id_fk,brand_id_fk,product_status,product_qty,price_per_qty,total_price,created_by,ctime) VALUES (?,?,?,?,?,?,?,?,?)";
    const connection = await db.getConnection();
    var priceqty = (getData.cost / getData.qty);

    try {
        var insertvalues = [
            getData.productname,
            getData.categoryId,
            getData.brandId,
            getData.availability,
            getData.qty,
            priceqty,
            getData.cost,
            getData.createdby,
            new Date()
        ];
        const [results] = await db.query(insertQuery, insertvalues);
        res.status(200).json({
            status: 1,
            message: 'Data inserted successfully'
        });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({
            status: 0,
            message: 'Failed to insert the data'
        });
    } finally {
        connection.release();
    }

};


// this function is to  gets all the products stored in the database
const getAllproducts = async (req, res) => {

    var getPdtquery = "SELECT ptm.*,cym.category_name,bdm.brand_name FROM product_master as ptm " +
        " LEFT JOIN category_master as cym on cym.category_id = ptm.category_id_fk " +
        " LEFT JOIN brand_master as bdm on bdm.brand_id = ptm.brand_id_fk ";

    try {
        const [results] = await db.query(getPdtquery);
        res.status(200).json(results);

    } catch (error) {
        console.error('Error Retrieving Products:', error);
        res.status(500).send('Error retrieving Products');
    }

};

//   this function allows to get single product from the database using product id
getProductData = async (req, res) => {
    var getData = req.body;
    var getQuery = " SELECT * FROM product_master WHERE product_id=" + getData.pId;
    try {
        const [results] = await db.query(getQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error Retrieving Data:', error);
        res.status(500).send('Error retrieving Data');
    }

};

modifyProduct = async (req, res) => {
    var getData = req.body;
    var updateQuery = " UPDATE product_master set product_name =?,category_id_fk=?,brand_id_fk=?,product_status=?,product_qty=?,price_per_qty=?,total_price=?,modified_by=?,mtime=? WHERE product_id=?";
       // Get connection from the db
       var connection = await db.getConnection();
       var priceqty = (getData.cost / getData.qty);
       try{
        const updateData  = [
            getData.productname,
            getData.categoryId,
            getData.brandId,
            getData.availability,
            getData.qty,
            priceqty,
            getData.cost,
            getData.updatedby,
            new Date(),
            getData.pId
        ];

        const [results] = await connection.query(updateQuery, updateData);
        console.log(results, "insertResults",(updateData,updateData));

        res.status(200).json({
            status: 1,
            message: 'Data Updated successfully'
        });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({
            status: 0,
            message: 'Failed to update the data'
        });
    } finally {
        connection.release();
    }
};



// this function will add the new sales record into the database
// const addSales = async (req, res) => {
//     const getData = req.body;
//     var insertQuery = "INSERT INTO sales_master(customer_name,customer_mobile,customer_mailid,product_id_fk,product_sold,product_totprice,sold_date,sold_by) VALUES (?,?,?,?,?,?,?,?)";
//     const connection = await db.getConnection();

//     try {
//         var insertvalues = [
//             getData.custname,
//             getData.custmobile,
//             getData.custmailid,
//             getData.productId,
//             getData.purchaseqty,
//             getData.totalprice,
//             new Date(),
//             getData.soldby
//         ];
//         const [results] = await db.query(insertQuery, insertvalues);
//         res.status(200).json({
//             status: 1,
//             message: 'Data inserted successfully'
//         });
//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({
//             status: 0,
//             message: 'Failed to insert the data'
//         });
//     } finally {
//         connection.release();
//     }

// };

const addSales = async (req, res) => {
    const getData = req.body;
    const insertQuery = `INSERT INTO sales_master 
        (customer_name, customer_mobile, customer_mailid, product_id_fk, product_sold, product_totprice, sold_date, sold_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const updateQuery = `UPDATE product_master 
        SET product_qty = product_qty - ?, 
            total_price = total_price - ? 
        WHERE product_id = ?`;
    const connection = await db.getConnection();

    try {
        // Insert into sales_master
        const insertValues = [
            getData.custname,
            getData.custmobile,
            getData.custmailid,
            getData.productId,
            getData.purchaseqty,
            getData.totalprice,
            new Date(),
            getData.soldby,
        ];
        await connection.query(insertQuery, insertValues);

        // Update product_master
        const updateValues = [
            getData.purchaseqty,
            getData.totalprice,
            getData.productId,
        ];
        await connection.query(updateQuery, updateValues);

        res.status(200).json({
            status: 1,
            message: 'Data inserted and product updated successfully',
        });
    } catch (error) {
        console.error('Error during transaction:', error);
        res.status(500).json({
            status: 0,
            message: 'Failed to insert and update the data',
        });
    } finally {
        connection.release();
    }
};


// this function is to  gets all the products stored in the database
const getAllSales = async (req, res) => {

    var getQuery = " SELECT sm.*,pm.product_name,bm.brand_name FROM sales_master  as sm " +
                   " LEFT JOIN product_master as pm ON pm.product_id = sm.product_id_fk"+
                   " LEFT JOIN brand_master as bm on bm.brand_id = pm.brand_id_fk";

    try {
        const [results] = await db.query(getQuery);
        res.status(200).json(results);

    } catch (error) {
        console.error('Error Retrieving Sales:', error);
        res.status(500).send('Error retrieving Sales');
    }

};



// this function is to delete the product from the table
deleteProduct = async (req, res) => {
    var getData = req.body;
    var DelQuery = "DELETE FROM product_master WHERE product_id="+getData.deleteID;
    try {
        const [results] = await db.query(DelQuery);
        res.status(200).json({
            status: 1,
            message: 'Deleted Product successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            status: 0,
            message: 'Failed to delete the product'
        });
    }

}


invoiceGeneration = async(req, res) =>{
        var getData = req.body;
        var getInvoicedata = getData.invoiceDetails;
        var getuserId = getData.userId;
        const connection = await db.getConnection();


            // Generate the invoice_number in your application
            // const today = new Date();
            // const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}${String(today.getFullYear()).slice(-2)}`;
            // const [rows] = await db.query('SELECT MAX(invoiceid) AS maxId FROM invoices');
            // const nextId = (rows[0].maxId || 1000) + 1;
            // const invoiceNumber = `INV${String(nextId).padStart(4, '0')}${formattedDate}`;

        // try {
        //     // Start a transaction
        //     await connection.beginTransaction();
        
        //     // Update the sales_master table
        //     const updateQuery = "UPDATE sales_master SET invoice_generated = 1 WHERE sales_id_pk = ?";
        //     await connection.query(updateQuery, [getInvoicedata.sales_id_pk]);
        
        //     // Insert into the invoices table
        //     const insertQuery = `
        //         INSERT INTO invoices (invoice_date, invoice_number, sales_id_fk, invoice_amount, invoice_generatedby) 
        //         VALUES (?, ?, ?, ?, ?)
        //     `;
        //     const insertData = [
        //         new Date(),
        //         invoiceNumber, // Ensure invoiceNumber is generated before this
        //         getInvoicedata.sales_id_pk,
        //         getInvoicedata.product_totprice,
        //         getuserId,
        //     ];
        //     await connection.query(insertQuery, insertData);
        
        //     // Commit the transaction
        //     await connection.commit();
        
        //     res.status(200).json({
        //         status: 1,
        //         message: 'Invoice Generated successfully',
        //     });
        // } catch (error) {
        //     // Rollback on error
        //     await connection.rollback();
        //     console.error('Error inserting/updating data:', error);
        //     res.status(500).json({
        //         status: 0,
        //         message: 'Failed to insert/update data',
        //     });
        // } finally {
        //     connection.release();
        // }
        try {
            
            let connection = await db.getConnection();
    
            // Start a transaction
            await connection.beginTransaction();
    
        
          
            const today = new Date();
            const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}${String(today.getFullYear()).slice(-2)}`;
            const invoiceNumber = `INV_${formattedDate}${String(getInvoicedata.sales_id_pk).padStart(4, '0')}`;
    
                // Update the sales_master table
                const updateQuery = "UPDATE sales_master SET invoice_generated = 1,generated_invoice_number='"+ invoiceNumber +"' WHERE sales_id_pk = ?";
                await connection.query(updateQuery, [getInvoicedata.sales_id_pk]);
        

            // Insert into the invoices table
            const insertQuery = `
                INSERT INTO invoices (invoice_date, invoice_number, sales_id_fk, invoice_amount, invoice_generatedby) 
                VALUES (?, ?, ?, ?, ?)
            `;
            const insertData = [
                new Date(),
                invoiceNumber,
                getInvoicedata.sales_id_pk,
                getInvoicedata.product_totprice,
                getuserId,
            ];
            await connection.query(insertQuery, insertData);
    
            // EasyInvoice configuration
            const invoiceData = {
                "documentTitle": "INVOICE",
                "currency": "EURO",
                "taxNotation": "vat",
                "marginTop": 25,
                "marginRight": 25,
                "marginLeft": 25,
                "marginBottom": 25,
                "logo": "https://ibb.co/c1Bn4Kx",
                "sender": {
                    "company": "Inventory Management",
                    "address": "12 Slievebloom Park,Walkinstown",
                    "city": "Dublin",
                    "country": "Ireland",
                    "custom1": "Email: inventorymanagement@gmail.com",
                    "custom2": "Phone: 123-456-7890"
                },
                "client": {
                    "company": getInvoicedata.customer_name,
                    "mobile": getInvoicedata.customer_mobile,
                    "email": getInvoicedata.customer_mailid,
                },
                "invoiceNumber": invoiceNumber,
                "invoiceDate": today.toISOString().split('T')[0],
                "products": [
                    {
                        "quantity": getInvoicedata.product_sold,
                        "description": getInvoicedata.product_name + " " + getInvoicedata.brand_name,
                        "price": getInvoicedata.product_totprice,
                    }
                ],
                "bottomNotice": "Thank you for your business!",
            };
    
            // Generate PDF
            const invoiceResult = await easyinvoice.createInvoice(invoiceData);
    
            // Save PDF locally
            const filePath = `./invoices/${invoiceNumber}.pdf`;
            fs.writeFileSync(filePath, invoiceResult.pdf, 'base64');
    
            // Commit the transaction
            await connection.commit();
    
            res.status(200).json({
                status: 1,
                message: 'Invoice generated successfully',
            });
        } catch (error) {
            // Rollback on error
            if (connection) await connection.rollback();
            console.error('Error inserting/updating data:', error);
            res.status(500).json({
                status: 0,
                message: 'Failed to insert/update data',
            });
        } finally {
            if (connection) connection.release(); // Always release the connection
        }

};


invoiceDownload = async( req, res) => {
    console.log(req.body,":invoice");
}

// exporting all the function to access 
module.exports = {
    getAllBrand,
    getAllCategory,
    addproduct,
    getAllproducts,
    getProductData,
    modifyProduct,
    addSales,
    getAllSales,
    deleteProduct,
    invoiceGeneration,
    invoiceDownload
};