import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="categoryInput-container">
                    <input
                        type="text"
                        className="categoryInput"
                        placeholder="Введите категорию"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button type="submit" className="categoryInputBtn">
                        Создать
                    </button>
                </div>
            </form>
        </>
    );
};

export default CategoryForm;