import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';

export default function Products(props) {
    const [show, setShow] = useState(false);
    const [name,setName] = useState('');
    const [quantity,setQuantity] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDiscription] = useState('')
    const [categoryId,setCategoryId] = useState('')
    const [productPictures,setProductPictures] = useState('')
    const dispatch = useDispatch()
    const category = useSelector(state=>state.category)


    const createCategoryList = (categories,options = []) =>{
        for(let category of categories){
            options.push({value:category._id,name:category.name})
            if(category.children.length > 0){
                createCategoryList(category.children,options)
            }
        }
        return options
    }
    const handleClose = () =>{
        const form = new FormData();
        form.append('name',name)
        form.append('quantity',quantity)
        form.append('price',price)
        form.append('description',description)
        form.append('category',categoryId)

        for(let pic of productPictures){
            form.append('productPictures',pic)
        }
        dispatch(addProduct(form))
        setShow(false)

    } 
    const handleShow = () => setShow(true);
    const handleProductPictures = (e)=>{
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    console.log(productPictures)

    } 
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12} >
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h3>Products</h3>
                            <Button variant="primary" style={{marginTop:'10px'}} onClick={handleShow}>
                                Add Category
                            </Button>
                            
                        </div>
                        
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input 
                        label="Name"
                        value={name} 
                        placeholder={'Name'}
                        onChange={(e)=>setName(e.target.value)}/>
                     <Input 
                        label="Quantity"
                        value={quantity} 
                        placeholder={'Quantity'}
                        onChange={(e)=>setQuantity(e.target.value)}/>
                    <Input 
                        label="Price"
                        value={price} 
                        placeholder={'Price'}
                        onChange={(e)=>setPrice(e.target.value)}/>
                    <Input 
                        label="Description"
                        value={description} 
                        placeholder={'Description'}
                        onChange={(e)=>setDiscription(e.target.value)}/>
                    <select onChange={(e)=>setCategoryId(e.target.value)} value={categoryId} className='form-control'>
                        <option>Select Category</option>
                            {
                                createCategoryList(category.categories).map(option=><option key={option.value} 
                                value={option.value}>{option.name}</option>)
                            }
                    </select>
                        {   
                            productPictures.length >0 ?
                            productPictures.map((pic,index)=><div key={index}>{pic.name}</div>) : null
                        }        


                    <Input

                        label="Pictures"
                        type='file'
                        name='productPicture'
                        placeholder={'Pictures'}
                        onChange={handleProductPictures}/>
                                       
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
