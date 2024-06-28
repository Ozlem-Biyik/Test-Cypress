import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"

const initialValues={
    ad:'',
    soyad:'',
    email:'',
    password:'',
};

export const errorMessages = {
    ad:'Adınızı en az 3 karakter giriniz.',
    soyad:'Soyadınızı en az 3 karakter giriniz.',
    email:'Geçerli bir email adresi giriniz.',
    password:'En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol ve en az 1 rakam içermelidir.',
};

export default function Register() {

   const [formData, setFormData] =useState(initialValues);
   const [errors, setErrors] = useState({
    ad:false,
    soyad:false,
    email:false,
    password:false,
});

  const [isValid, setIsValid] =useState(false);
  const [id, setId] =useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  
  let regex =  
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 


  useEffect( ()=>{
    if(
        formData.ad.trim().length>=3 &&
        formData.soyad.trim().length>=3 &&
        validateEmail(formData.email) &&
        regex.test(formData.password)
    ) {
        setIsValid(true);
    }else{
        setIsValid(false);
    }
  }, [formData]

  );

   const handleChange = (event) => {
    const {name, value} =event.target;
    setFormData({...formData, [name]:value});

    if(name==="ad" || name==="soyad") {
        if(value.trim().length>=3){
            setErrors({...errors, [name]:false})
        }else {
            setErrors({...errors, [name]:true})  
        }
    }
    if(name==="email") {
        if(validateEmail(value)){
            setErrors({...errors, [name]:false})  
        }else{
            setErrors({...errors, [name]:true})  
        }
    }
    if(name==="password") {
        if(regex.test(value)){
            setErrors({...errors, [name]:false})  
        }else{
            setErrors({...errors, [name]:true})  
        }
    }

   }

   const handleSubmit = (event) => {
    event.preventDefault();
    if(!isValid) return;
    axios
    .post("https://reqres.in/api/users", formData)
    .then((response)=>{
        setId(response.data.id);
        setFormData(initialValues);
    })
    .catch((error)=>console.warn(error));
   };

    return (
        <Card>
            <CardHeader>Kayıt Ol</CardHeader>
        <CardBody>
    <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="ad">
      Ad:
    </Label>
    <Input
      id="ad"
      name="ad"
      placeholder="Adınızı giriniz"
      type="text"
      onChange={handleChange}
      value={formData.ad}
      invalid={errors.ad}
      data-cy="ad-input"
    />
    {errors.ad && <FormFeedback data-cy="error-message">{errorMessages.ad}</FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="soyad">
      Soyad:
    </Label>
    <Input
      id="soyad"
      name="soyad"
      placeholder="Soyadınızı giriniz"
      type="text"
      onChange={handleChange}
      value={formData.soyad}
      invalid={errors.soyad}
      data-cy="soyad-input"
    />
    {errors.soyad && <FormFeedback data-cy="error-message">{errorMessages.soyad}</FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="email">
      Email:
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Kurumsal email adresinizi giriniz"
      type="email"
      onChange={handleChange}
      value={formData.email}
      invalid={errors.email}
      data-cy="email-input"
    />
    {errors.email && <FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="password">
      Password:
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Güçlü bir password seçiniz"
      type="password"
      onChange={handleChange}
      value={formData.password}
      invalid={errors.password}
      data-cy="password-input"
    />
    {errors.password && <FormFeedback data-cy="error-message">{errorMessages.password}</FormFeedback>}
  </FormGroup>
  <Button disabled={!isValid} data-cy="submit-button">
    Kayıt Ol
  </Button>
</Form>
</CardBody>
{id && <CardFooter data-cy="response-message">ID: {id}</CardFooter>}
</Card>
)
}