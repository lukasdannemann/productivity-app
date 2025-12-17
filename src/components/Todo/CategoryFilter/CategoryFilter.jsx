import { useState } from "react";
import styles from "./CategoryFilter.module.css";

export default function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
  categoriesArray,
}) {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const selectAllCategories = () => setSelectedCategories(categoriesArray);
  const clearCategories = () => setSelectedCategories([]);

  return (
    <div className={styles.categories}>
      <button
        type="button"
        className={styles.smallButton}
        onClick={() => setShowCategories(!showCategories)}>
        Categories ({selectedCategories.length})
      </button>

      {showCategories && (
        <>
          <div className={styles.categoryList}>
            {categoriesArray.map((category) => (
              <label key={category} className={styles.categoryItem}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          <div className={styles.categoryButtons}>
            <button
              type="button"
              className={styles.smallButton}
              onClick={selectAllCategories}>
              Select all
            </button>

            <button
              type="button"
              className={styles.smallButton}
              onClick={clearCategories}>
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}
