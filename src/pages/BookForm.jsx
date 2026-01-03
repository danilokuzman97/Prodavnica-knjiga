import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, updateBook, getBookById } from "../services/bookService.js";

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const book = await getBookById(id);
          setValue("title", book.title);
          setValue("pageCount", book.pageCount);
          setValue("publishedDate", book.publishedDate.split('T')[0]);
          setValue("isbn", book.isbn);  
          setValue("authorId", book.authorId); 
          setValue("publisherId", book.publisherId); 
        } 
        catch (error) {
          console.error("Fetch book ne radi:", error);
          alert("Cant fetch a book.");
        }
      };
      fetchBook();
    }
  }, [id, setValue]);

  const onFormSubmit = async (data) => {
    try {
      const bookData = {  
        title: data.title,
        pageCount: parseInt(data.pageCount),
        publishedDate: new Date(data.publishedDate).toISOString(),
        isbn: data.isbn,
        authorId: parseInt(data.authorId),
        publisherId: parseInt(data.publisherId),
      };

      console.log("Sending book data:", bookData);

      if (id) {
        await updateBook(id, { ...bookData, id: parseInt(id) });
      } else {
        await createBook(bookData);
      }

      reset();
      navigate("/books");
    } 
    catch (error) {
      console.error("Save book failed:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      alert("Error saving a book");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label>Title:</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Book title"
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <label>Page Count:</label>
        <input
          type="number"
          {...register("pageCount", { required: "Page count is required" })}
          placeholder="Number of pages"
        />
        {errors.pageCount && <span>{errors.pageCount.message}</span>}
      </div>

      <div>
        <label>Published Date:</label>
        <input
          type="date"
          {...register("publishedDate", { required: "Published date is required" })}
        />
        {errors.publishedDate && <span>{errors.publishedDate.message}</span>}
      </div>

      <div>
        <label>ISBN:</label>
        <input
          {...register("isbn", { required: "ISBN is required" })}
          placeholder="ISBN number"
        />
        {errors.isbn && <span>{errors.isbn.message}</span>}
      </div>

      <div>
        <label>Author ID:</label>
        <input
          type="number"
          {...register("authorId", { required: "Author ID is required" })}
          placeholder="Enter author ID"
        />
        {errors.authorId && <span>{errors.authorId.message}</span>}
      </div>

      <div>
        <label>Publisher ID:</label>
        <input
          type="number"
          {...register("publisherId", { required: "Publisher ID is required" })}
          placeholder="Enter publisher ID"
        />
        {errors.publisherId && <span>{errors.publisherId.message}</span>}
      </div>

      <button type="submit">{id ? "Update Book" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;