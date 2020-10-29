import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row,Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory } from '../../actions'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

export default function Category(props) {
    const dispatch = useDispatch()
    const category = useSelector(state=>state.category)
    const [show, setShow] = useState(false);
    const [categoryName,setCategoryName] = useState('')
    const [parentCategoryId,setParentCategoryId] = useState('')
    const [categoryImage,setCategoryImage] = useState('')



    const handleClose = () =>{
        const form = new FormData();
        // const cat = {
        //    categoryName,
        //    parentCategoryId,
        //    categoryImage 
        // }
        form.append('name',categoryName)
        form.append('parentId',parentCategoryId)
        form.append('categoryImage',categoryImage)
        dispatch(addCategory(form))
        setShow(false);

    } 
    const handleShow = () => setShow(true);
    //console.log(category)
    useEffect(()=>{
        console.log(`Category.js`)
        dispatch(getAllCategory())
    },[])
    
    const renderCategories = (categories) =>{
        let myCategories = [];
        for(let category of categories){
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories;
    }
    const createCategoryList = (categories,options = []) =>{
        for(let category of categories){
            options.push({value:category._id,name:category.name})
            if(category.children.length > 0){
                createCategoryList(category.children,options)
            }
        }
        return options
    }
    const handleCategoryImage = (e)=>{
        setCategoryImage(e.target.files[0])
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12} >
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h3>Category</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add Category
                            </Button>
                            
                        </div>
                        
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Category Name</Form.Label>
                    <Input 
                        value={categoryName} 
                        placeholder={'Category Name'}
                        onChange={(e)=>setCategoryName(e.target.value)}/>
                    <select onChange={(e)=>setParentCategoryId(e.target.value)} value={parentCategoryId} className='form-control'>
                        <option>Select Category</option>
                            {
                                createCategoryList(category.categories).map(option=><option key={option.value} 
                                value={option.value}>{option.name}</option>)
                            }
                    </select>
                    <Input type={'file'} name='categoryImage' onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}
