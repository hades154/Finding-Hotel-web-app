import { Form } from 'react-bootstrap';
const FormRowSelect = ({ labelText, type, name, value, handleChange, list }) => {
    <Form.Group className='form-control'>
        <Form.Label>{labelText}</Form.Label>
        <Form.Select name={name} value={value} onChange={handleChange}>
            {list.map((itemValue, index) => {
                return (
                    <option key={index} value={itemValue}>
                        {itemValue}
                    </option>
                )
            })}
        </Form.Select>
    </Form.Group>
}
export default FormRowSelect