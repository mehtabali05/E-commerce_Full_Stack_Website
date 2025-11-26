import React from 'react'

const CategoryForm = ({value,setValue,handleSubmit}) => {
  return (
    <div className='w-80 mt-3 mb-4'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder='Enter Category Name' value={value} onChange={(e) => setValue(e.target.value)} /> 
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>

    </div>
  )
}

export default CategoryForm
