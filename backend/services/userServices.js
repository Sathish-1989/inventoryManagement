// const {
//     get
// } = require('request');
const { error } = require('console');
var db = require('../database'),
    crypto = require('crypto');


// this function is to get the all the users from the table
const getEntireUser = async (req, res) => {
    var getData = req.body;
    var Query;
    console.log(getData,"userlist");
    try {
        if(getData.roleid == 1){
           Query = "SELECT um.*,rm.role_name as rolename FROM user_master as um " +
            " LEFT JOIN role_master as rm ON rm.role_id_pk = um.role_id_fk WHERE um.role_id_fk != 1";
        } else {
           Query = "SELECT um.*,rm.role_name as rolename FROM user_master as um " +
            " LEFT JOIN role_master as rm ON rm.role_id_pk = um.role_id_fk WHERE um.role_id_fk NOT IN (1,2)";
        }
      

        // Get a connection from the db and execute the query
        const [results] = await db.query(Query);

        // Send the results as JSON
        res.status(200).json(results);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error retrieving users');
    }
};

// this function is to get all the roles from table
const getUserRoles = async (req, res) => {
    var getData = req.body;
    var Query;
    try {
        if(getData.roleid == 1){
            Query = "SELECT * FROM role_master WHERE role_id_pk != 1";
        }else {
            Query = "SELECT * FROM role_master WHERE role_id_pk NOT IN (1,2)";
        }
        

        // Get a connection from the db and execute the query
        const [results] = await db.query(Query);

        // Send the results as JSON
        res.status(200).json(results);
    } catch (error) {
        console.error('Error Retrieving Roles:', error);
        res.status(500).send('Error retrieving roles');
    }
};


// this function is to get all the designations from table
const getallDesignations = async (req, res) => {
    var getData = req.body;
    var Query;
    try {
        if(getData.roleid == 1){
            Query = "SELECT * FROM user_designation WHERE des_id_pk != 1";
        }else {
            Query = "SELECT * FROM user_designation WHERE des_id_pk NOT IN (1,2)";
        }
        

        // Get a connection from the db and execute the query
        const [results] = await db.query(Query);

        // Send the results as JSON
        res.status(200).json(results);
    } catch (error) {
        console.error('Error Retrieving Roles:', error);
        res.status(500).send('Error retrieving roles');
    }
};

//this function is to add new user into the table
const addUser = async (req, res) => {
    const getData = req.body;
    console.log(getData, "getData");

    try {
        // Hash password
        const hashPassword = crypto.createHash('sha256').update(getData.password).digest('hex');
        console.log(hashPassword, "hashedPassword");

        // Database queries
        const selectQuery = "SELECT COUNT(*) AS count FROM user_master WHERE role_id_fk != 1";
        const insertQuery = `
            INSERT INTO user_master(
                username, password, emailId,employee_no, firstname, lastname, role_id_fk,des_id_fk, user_status, created_by, ctime
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Get connection from the db
        const connection = await db.getConnection();
        try {
            const [rows] = await connection.query(selectQuery);
            const count = rows[0].count;
            const employeeID = `EMP${1000 + count}`;

            const insertData = [
                getData.email,
                hashPassword,
                getData.email,
                employeeID,
                getData.firstname,
                getData.lastname,
                getData.roleid,
                getData.desid,
                getData.status,
                getData.createdby,
                new Date()
            ];

            const [results] = await connection.query(insertQuery, insertData);
            console.log(results, "insertResults");

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
    } catch (error) {
        console.error('Error with connection or hashing:', error);
        res.status(500).json({
            status: 0,
            message: 'Internal server error'
        });
    }
};


// this function is to modify the data of a single user
getviewData = async (req, res) => {
    var getData = req.body;
    var getQuery = " SELECT * FROM user_master WHERE user_id_pk=" + getData.id;
    try {
        const [results] = await db.query(getQuery);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error Retrieving Data:', error);
        res.status(500).send('Error retrieving Data');
    }

};

modifyUser = async (req, res) => {
        var getData = req.body;
        var updateQuery = " UPDATE user_master set firstname = ?, lastname = ?, role_id_fk = ?, user_status = ?, modified_by =?, mtime=? WHERE user_id_pk=?";
           // Get connection from the db
           var connection = await db.getConnection();
           try{
            const updateData = [
                getData.firstname,
                getData.lastname,
                getData.roleid,
                getData.status,
                getData.updatedby,
                new Date(),
                getData.id
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
    
// this function is to delete the user from the delete
deleteUser = async (req, res) => {
    var getData = req.body;
    var DelQuery = "DELETE FROM user_master WHERE user_id_pk="+getData.deleteID;
    try {
        const [results] = await db.query(DelQuery);
        res.status(200).json({
            status: 1,
            message: 'Deleted User successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 0,
            message: 'Failed to delete the user'
        });
    }

}

// exportings all the functions to access
module.exports = {
    getEntireUser,
    getUserRoles,
    getallDesignations,
    addUser,
    getviewData,
    modifyUser,
    deleteUser
};