export const CategorySelector = ({ categories, handleChangeCategory, handleChangeSubCategory, post, setPost, subSubCategory, filterSubcategories }) => (
    <div>
        <div className="box_market">
            <label className="label_market">Категория</label>
            <select
                className="select_market"
                value={post.cat}
                onChange={handleChangeCategory}
            >
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        {post.cat && (
            <div className="box_market">
                <label className="label_market">Под категория</label>
                <select
                    className="select_market"
                    value={post.subcat}
                    onChange={handleChangeSubCategory}
                >
                    <option value="">Выберите подкатегорию</option>
                    {filterSubcategories(post.cat, categories).map((subcategory) => (
                        <option
                            key={subcategory.id}
                            value={subcategory.id}
                        >
                            {subcategory.name}
                        </option>
                    ))}
                </select>
            </div>
        )}
        {post.subcat && (
            <div className="box_market">
                <label className="label_market">Под подкатегория</label>
                <select
                    className="select_market"
                    value={post.subsubcat}
                    onChange={(e) => {
                        setPost({ ...post, subsubcat: e.target.value });
                    }}
                >
                    <option value="">Выберите подкатегорию</option>
                    {subSubCategory.map((subSubcategory) => (
                        <option
                            key={subSubcategory.id}
                            value={subSubcategory.id}
                        >
                            {subSubcategory.name}
                        </option>
                    ))}
                </select>
            </div>
        )}
    </div>
);