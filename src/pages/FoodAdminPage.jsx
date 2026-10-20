import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { foodsFailed, foodsLoaded, foodsLoading, selectFoods, selectFoodsStatus } from "../store/cartSlice";

const emptyForm = { name: "", category: "", price: "", rating: "4.5", image: "", description: "" };

export default function FoodAdminPage() {
  const dispatch = useDispatch();
  const foods = useSelector(selectFoods);
  const status = useSelector(selectFoodsStatus);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const refreshFoods = async () => {
    console.info("GET Request: Fetching updated food list...");
    dispatch(foodsLoading());
    try {
      const { data } = await api.get("/foods");
      console.info("GET Request: Food list received.", data);
      dispatch(foodsLoaded(data));
    } catch (loadError) {
      console.error("GET Request failed:", loadError);
      dispatch(foodsFailed(loadError.response?.data?.message));
    }
  };

  useEffect(() => { if (status === "idle") refreshFoods(); }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const edit = (food) => {
    setEditingId(food.id);
    setForm({ name: food.name, category: food.category, price: String(food.price), rating: String(food.rating), image: food.image, description: food.description });
    setError(""); setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (event) => {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      if (editingId) {
        console.info("PUT Request: Updating food:", form);
        await api.put(`/foods/${editingId}`, form);
      } else {
        console.info("POST Request: Adding new food:", form);
        await api.post("/foods", form);
      }
      await refreshFoods(); setForm(emptyForm); setEditingId(null);
      setNotice(editingId ? "Food item updated." : "Food item added.");
    } catch (saveError) {
      console.error("Food save request failed:", saveError);
      setError(saveError.response?.data?.message || "Could not save this food item.");
    }
    finally { setBusy(false); }
  };

  const remove = async (id) => {
    setBusy(true); setError(""); setNotice("");
    try {
      console.info("DELETE Request: Removing food item:", id);
      await api.delete(`/foods/${id}`);
      await refreshFoods(); setNotice("Food item deleted.");
    } catch (deleteError) {
      console.error("Food delete request failed:", deleteError);
      setError(deleteError.response?.data?.message || "Could not delete this food item.");
    }
    finally { setBusy(false); }
  };

  return (
    <div className="page">
      <section className="page-hero compact"><p className="eyebrow">EXPERIMENT 3</p><h1>Manage food items.</h1><p>Add, update, and delete dishes through the REST API.</p></section>
      <section className="section admin-layout">
        <form className="admin-form" onSubmit={save}>
          <h2>{editingId ? "Update dish" : "Add a dish"}</h2>
          <label>Name<input name="name" required value={form.name} onChange={change} /></label>
          <div className="form-grid">
            <label>Category<input name="category" required value={form.category} onChange={change} /></label>
            <label>Price (₹)<input name="price" type="number" min="1" required value={form.price} onChange={change} /></label>
          </div>
          <label>Image URL<input name="image" value={form.image} onChange={change} /></label>
          <label>Description<textarea name="description" rows="3" value={form.description} onChange={change} /></label>
          {error && <p role="alert" className="form-error">{error}</p>}{notice && <p role="status">{notice}</p>}
          <div className="admin-actions"><button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : editingId ? "Update food" : "Add food"}</button>{editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</button>}</div>
        </form>
        <div className="admin-list">
          <h2>Food list</h2>
          {status === "loading" && <p role="status">Loading food items…</p>}
          {status === "failed" && <p role="alert">Could not load food items.</p>}
          {foods.map((food) => <article className="admin-food-row" key={food.id}><div><strong>{food.name}</strong><span>{food.category} · ₹{food.price}</span></div><div className="admin-actions"><button className="btn btn-outline" onClick={() => edit(food)}>Edit</button><button className="btn btn-outline" disabled={busy} onClick={() => remove(food.id)}>Delete</button></div></article>)}
        </div>
      </section>
    </div>
  );
}
