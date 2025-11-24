import {useContext, useState} from "react";
import {assets} from "../../assets/assets.js";
import {AppContext} from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import {addItem} from "../../Service/ItemService.js";

const ItemForm = () => {
    const {categories, setItemsData, itemsData, setCategories, refreshItems} = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
        stockQuantity: 0,
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("item", JSON.stringify(data));
        formData.append("file", image);
        try {
            if (!image) {
                toast.error("Select image");
                return;
            }

            const response = await addItem(formData);
            if (response.status === 201) {
                await refreshItems(); // Refresh items to show updated data
                setCategories((prevCategories) =>
                prevCategories.map((category) => category.categoryId === data.categoryId ? {...category, items: category.items + 1} : category));
                toast.success("Item added");
                setData({
                    name: "",
                    description: "",
                    price: "",
                    categoryId: "",
                    stockQuantity: 0,
                })
                setImage(false);
            } else {
                toast.error("Unable to add item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to add item");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="item-form-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-12 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48}/>
                                    </label>
                                    <input type="file" name="image" id="image" className='form-control' hidden onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input type="text"
                                           name="name"
                                           id="name"
                                           className="form-control"
                                           placeholder="Ingresa nombre de item"
                                           onChange={onChangeHandler}
                                           value={data.name}
                                           required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="category">
                                        Categoría
                                    </label>
                                    <select name="categoryId" id="category" className="form-control" onChange={onChangeHandler} value={data.categoryId} required>
                                        <option value="">--Selecciona la categoría--</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" name="price" id="price" className="form-control" placeholder="$ 000.00" onChange={onChangeHandler} value={data.price} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
                                    <input type="number" name="stockQuantity" id="stockQuantity" className="form-control" placeholder="0" onChange={onChangeHandler} value={data.stockQuantity} min="0" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Ingresa una descripción"
                                        onChange={onChangeHandler}
                                        value={data.description}></textarea>
                                </div>
                                <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "Cargando..." : "Hecho"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemForm;