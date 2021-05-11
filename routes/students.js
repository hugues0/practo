const express = require('express');
const router = express.Router();
const Joi = require('joi');

const students = [
    {id: 1, name: 'hugues'},
    {id: 2, name: 'jeexy'},
    {id: 3, name: 'manisha'},
]

//router.get('/',(req,res)=>{
  //  res.send('hello world');
//});

router.get('/',(req,res)=>{
    res.send(students);
});

 router.post('/',(req,res)=>{
      const { error } = validateStudent(req.body);
    if (error) return res.status(404).send(result.error.details[0].message);
        
    const student = {
        id: students.length +1,
        name: req.body.name
    };
    students.push(student);
    res.send(student);
        
 });

router.get('/:id', (req,res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('student with the given id was not found in the database');
    res.send(student);
});

router.put('/:id',(req,res) =>{
    const student = students.find (c =>c.id === parseInt (req.params.id));
    if (!student) return res.status(404).send('student with the given id was not found in the database');
    
  // const result = validateStudent(req.body);
    const { error } = validateStudent(req.body);
    if (error)return res.status(404).send(error.details[0].message);

    student.name = req.body.name;
    res.send(student);
     
});

router.delete('/:id',(req,res) => {
    const student = students.find (c =>c.id === parseInt (req.params.id));
    if (!student) return res.status(404).send('student with the given id was not found in the database');
    const index = students.indexOf(student);
    students.splice (index,1);
    res.send(student);
});

function validateStudent(student){
     const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(student, schema);
    
    }
    
module.exports = router;