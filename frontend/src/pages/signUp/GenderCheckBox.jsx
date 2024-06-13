import React from 'react'

const GenderCheckBox = () => {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label htmlFor="maleCheckbox" className='label gap-2 cursor-pointer'>
          <span className='label-text text-white'>Male</span>
          <input id="maleCheckbox" type="checkbox" className='checkbox checkbox-primary border-slate-900'/>
        </label>
      </div>
      <div className='form-control'>
        <label htmlFor="femaleCheckbox" className='label gap-2 cursor-pointer'>
          <span className='label-text text-white'>Female</span>
          <input id="femaleCheckbox" type="checkbox" className='checkbox checkbox-primary border-slate-900'/>
        </label>
      </div>
    </div>
  )
}

export default GenderCheckBox
