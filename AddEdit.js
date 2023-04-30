import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import './AddEdit.css';
import fireDb from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    name: "",
    email: "",
    contact: ""
}

const AddEdit = () => {
const [state, setState] = useState(initialState);
const [data, setData] = useState({});

const {name, email, contact} = state;

const history = useHistory();

const {id} = useParams ();

useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
        if(snapshot.val()!==null) {
            setData({...snapshot.val()})
        } else {
            setData({});
        }
    });

    return () => {
        setData({});
    };
}, [id]);

useEffect(() => {
    if (id) {
        setState({...data[id]});
    } else {
        setState({...initialState});
    }

    return () => {
        setState({...initialState});
    };

}, [id, data]);

const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};

const handleSubmmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
        toast.error("Please provide your contact details");
    } else {
        if(!id) {
            fireDb.child("contacts").push(state, (err) =>{
                if(err) {
                    toast.error(err);
                } else {
                    toast.success("Contact added successfully");
                }
            });
        } else {
            fireDb.child(`contacts/${id}`).set(state, (err) =>{
                if(err) {
                    toast.error(err);
                } else {
                    toast.success("Contact updated successfully");
                }
            });
        }

        setTimeout(() => history.push("/"), 500);
    }
};
    return (
        <div style={{marginTop: "100px"}} >
            <form style={{
                margin: "auto", 
                padding: "15px", 
                maxwidth: "400px", 
                alignContent: "center"
        }}
        onSubmit={handleSubmmit}
        >
            <label htmlFor="name">Name</label>
            <input 
            type="text"
            id="name"
            name="name"
            placeHolder="type your name"
            value={name || "" }
            onChange={handleInputChange}
            />

            <label htmlFor="email">Email</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeHolder="type your email"
            value={email || "" }
            onChange={handleInputChange}
            />

            <label htmlFor="contact">Contact</label>
            <input 
            type="number"
            id="contact"
            name="contact"
            placeHolder="type you contact number"
            value={contact || "" }
            onChange={handleInputChange}
            />
            
            <input type="submit" value={id ? "Update" : "Save"}
            />

        </form>
        </div>
    );
};

export default AddEdit;