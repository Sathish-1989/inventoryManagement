var db = require('../database');
const {
    get
} = require('request');

const getAllDetails = async ( req, res) =>{

    try{
        var selectQuery = " SELECT BM.brand_name,COUNT(*)AS itemCount FROM sales_master AS SM " +
                          " LEFT JOIN product_master AS PM ON PM.product_id = SM.product_id_fk " +
                          " LEFT JOIN brand_master AS BM ON BM.brand_id = PM.brand_id_fk "+
                          " WHERE BM.brand_id IN (1,2,3,4,5,6) GROUP BY BM.brand_name ";

                          const [results] = await db.query(selectQuery);

                          // Send the results as JSON
                          res.status(200).json(results);
                      } catch (error) {
                          console.error('Error Retrieving brands:', error);
                          res.status(500).send('Error retrieving brands');
                      }

};





module.exports ={ getAllDetails };