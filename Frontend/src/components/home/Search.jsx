import React,{useState} from 'react';
// readymade calendar component
import {DatePicker, Space} from "antd";
import "../../css/Home.css"
import{useDispatch}from "react-redux"
import {propertyAction} from "../../store/Property/property-slice"
import { getAllProperties } from '../../store/Property/property-action';
const Search = () => {

    const {RangePicker} = DatePicker
    const [keyword, setKeyword] = useState({city: "", guests: "", dateIn: "", dateOut: ""});
    const [value,setValue] = useState(null)
     const dispatch = useDispatch()

    function searchHandler(e){
        e.preventDefault();
        dispatch(propertyAction.updateSearchParams({ ...keyword, page: 1 }));
        dispatch(getAllProperties())
        setKeyword({city: "", guests: "", dateIn: "", dateOut: ""})
        setValue(null)
    }

    function returnDates(dates){
        setValue(dates);
        updateKeyword("dateIn", dates?.[0]?.format("YYYY-MM-DD") ?? "");
        updateKeyword("dateOut", dates?.[1]?.format("YYYY-MM-DD") ?? "");
    }
    
    const updateKeyword = (field, value) =>{
          setKeyword((prevKeyword) => ({
            ...prevKeyword,
            [field]: value
          }));
    }

  return (
    <>
    <form className='searchbar' onSubmit={searchHandler}>
        <input
        className='search'
        id='search_destination'
        placeholder='Search destination'
        type='text'
        value = {keyword.city}
        onChange={(e) => updateKeyword("city", e.target.value)}
        />
        <Space  direction='vertical' size={12} className='search'>
            <RangePicker
            value ={value}
            format="DD-MM-YYYY"
            picker ="date"
            className="date_picker"
            disabledDate={(current) => {
                return current && current.isBefore(Date.now(), "day")
            }}
            onChange={returnDates}
            />
        </Space>
        <input
        className='search'
        id= "addguest"
        placeholder="Add Guests"
        type='number'
        min="1"
        step="1"
        value = {keyword.guests}
        onChange={(e) => updateKeyword("guests", e.target.value)}
        />
        <button className='material-symbols-outlined searchicon' type="submit" aria-label="Search">
          search
        </button>
      
    </form>
    </>
  )
    
    
}

export default Search
