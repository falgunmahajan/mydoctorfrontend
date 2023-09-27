import { render, screen } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import SignUp from '../pages/SignUp';

describe('Is All fields validates',()=>{
    test('Is Name field Validates',()=>{
        render(<SignUp />)
        const nameElement=screen.getByTestId("name")
        act(()=> userEvent.type(nameElement, "456243"))
        const nameError=screen.getByText("Please enter a valid name!")
        expect(nameError).toBeInTheDocument();
    })
    test('Is contact field Validates',()=>{
        render(<SignUp />)
        const contactElement=screen.getByTestId("contact")
        act(()=> userEvent.type(contactElement, "365642"))
        const contactError=screen.getByText("Please enter a valid 10-digit mobile number!")
        expect(contactError).toBeInTheDocument();
    })
    test('Is email field Validates',()=>{
        render(<SignUp />)
        const emailElement=screen.getByTestId("email")
        act(()=> userEvent.type(emailElement, "365642"))
        const emailError=screen.getByText("Please enter a valid e-mail address!")
        expect(emailError).toBeInTheDocument();
    })
    test('Is password contain lowercase',()=>{
        render(<SignUp />)
        const passwordElement=screen.getByTestId("password")
        act(()=> userEvent.type(passwordElement, "yadB"))
        const lowercaseIcon=screen.getByTestId("lowercase right")
        expect(lowercaseIcon).toBeInTheDocument();
    })
    test('Is password contain uppercase',()=>{
        render(<SignUp />)
        const passwordElement=screen.getByTestId("password")
        act(()=> userEvent.type(passwordElement, "YAKa"))
        const uppercaseIcon=screen.getByTestId("uppercase right")
        expect(uppercaseIcon).toBeInTheDocument();
    })
    test('Is password contain specialcharacter',()=>{
        render(<SignUp />)
        const passwordElement=screen.getByTestId("password")
        act(()=> userEvent.type(passwordElement, "&@#%$2"))
        const specialcharacterIcon=screen.getByTestId("specialcharacter right")
        expect(specialcharacterIcon).toBeInTheDocument();
    })
    test('Is password contain digit',()=>{
        render(<SignUp />)
        const passwordElement=screen.getByTestId("password")
        act(()=> userEvent.type(passwordElement, "&@#%$2"))
        const digitIcon=screen.getByTestId("digit right")
        expect(digitIcon).toBeInTheDocument();
    })
    test('Is password contain sixchar',()=>{
        render(<SignUp />)
        const passwordElement=screen.getByTestId("password")
        act(()=> userEvent.type(passwordElement, "&@#%$2"))
        const sixcharIcon=screen.getByTestId("sixchar right")
        expect(sixcharIcon).toBeInTheDocument();
    })
    test('Is password and confirmpassword match',()=>{
        render(<SignUp />)
        const passwordElement=screen.getByTestId("password")
        const confirmpasswordElement=screen.getByTestId("confirmpassword")
        act(()=> {userEvent.type(passwordElement, "Agf21#")
        userEvent.type(confirmpasswordElement, "Agf21#")
    })
  
        const matchIcon=screen.getByTestId("match right")
        expect(matchIcon).toBeInTheDocument();
    })
})