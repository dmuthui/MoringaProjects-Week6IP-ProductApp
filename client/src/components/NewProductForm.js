import React from 'react';
import '../styles/productForm.css';
import PropTypes from 'prop-types'; 

import {v4} from 'uuid'; //new code

function NewProductForm(props) {
    
    // Function for handling onsubmission event
    function handleNewProductFormSubmission(event){
        event.preventDefault();
        // console.log(event.target.name.value)
        // console.log(event.target.price.value)
        // console.log(event.target.description.value)
        // console.log(event.target.quantity.value);

        props.onNewProductCreation({
            name: event.target.name.value,
            price: event.target.price.value,
            description: event.target.description.value,
            quantity: event.target.quantity.value,
            image:event.target.file,
            id: v4()
        })

    }

    return (
        <React.Fragment>

            <div className="container product-form">

                <form className="new-product-form" method="POST" enctype="multipart/form-data" onSubmit={handleNewProductFormSubmission}>

                    <h1>Product Form</h1>
                    <div className="form-input-material">
                        <input type = 'text'
                            name = 'name'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'name'
                        />
                        <label htmlFor="name"> Name</label>
                    </div>
                    <div className="form-input-material">
                        <input type = 'text'
                            name = 'price'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'price'
                            required
                        />
                        <label htmlFor="price"> Price</label>
                    </div>
                    <div className="form-input-material">
                        <textarea type = 'text'
                            name = 'description'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'description'
                            required
                        />
                        <label htmlFor="description"> Description </label>
                    </div>
                    <div className="form-input-material">
                        <input type = 'number'
                            name = 'quantity'
                            placeholder = ' '
                            className = 'form-control-material'
                            autoComplete="off"
                            id = 'quantity'
                            required
                        />
                        <label htmlFor="quantity"> Quantity</label>
                    </div>
                    <div class="file-field input-field">
                        <label htmlFor="image">Upload Product Image</label>
                        <input type = 'file'
                                name = 'image'
                                placeholder = ' '
                                className = 'form-control-material'
                                id = 'formFile'
                                required
                            />
                    </div>
                    <button type="submit" className="btn btn-primary btn-ghost">Add Product</button>    
                </form>
            </div>
        </React.Fragment>
    )
}

NewProductForm.propTypes = {
    onNewProductCreation: PropTypes.func
}

export default NewProductForm;