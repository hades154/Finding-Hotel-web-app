import {Form} from 'react-bootstrap';
const FormRowControl = ({labelText,type,placeholder, name, value, handleChange}) => {
    return type === 'number' ? (
        <Form.Group className='form-control'>
            <Form.Label>{labelText}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} min='0' name={name} value={value} onChange={handleChange} />
        </Form.Group>
    ) : (
        <Form.Group className='form-control'>
            <Form.Label>{labelText}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} name={name} value={value} onChange={handleChange} />
        </Form.Group>
    )
}

export default FormRowControl