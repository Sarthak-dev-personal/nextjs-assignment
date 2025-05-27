import {
  useEffect,
  useState,
} from "react";

/**
 * Type of form data to be submitted on saving/editing the modal.
 */
export interface IFormData {
    title: string;
    description: string;
    status: string;
}

/**
 * TODO Data type.
 */
export interface IToDoData extends IFormData{
    _id: string;
}

/**
 * Type of props received from the parent component.
 */
interface IModalProps {
    todoItemBeingEdited?: IToDoData;
    onSubmit: ({ title, description, status}: IFormData) => Promise<void>;
    onCancel: () => void;
}

/**
 * @description Add or Edit Task Modal component.
 */
const AddOrEditTask = ({ todoItemBeingEdited, onSubmit, onCancel }: IModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {
      if (todoItemBeingEdited) {
        setTitle(todoItemBeingEdited.title);
        setDescription(todoItemBeingEdited.description);
        setStatus(todoItemBeingEdited.status);
      }
    }, [todoItemBeingEdited]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ title, description, status });
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Add TODO</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border border-gray-300 p-2 mb-4 w-full rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border border-gray-300 p-2 mb-4 w-full rounded"
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 p-2 mb-4 w-full rounded">
                <option
                    value="pending"
                    disabled={ todoItemBeingEdited ? false : true }
                >
                    Pending
                </option>
                <option
                    value="completed"
                    disabled={ todoItemBeingEdited ? false : true }
                >
                    Completed
                </option>
              </select>
              <div className="flex justify-between">
                <button type="button" onClick={handleCancel} className="bg-gray-300 text-black p-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
    );
}

export default AddOrEditTask;
