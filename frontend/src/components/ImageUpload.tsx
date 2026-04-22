import { useId } from "react";
import { CiCirclePlus } from "react-icons/ci";

interface ImageUploadProps {
    onFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ImageUploader({ onFileSelect }: ImageUploadProps) {
    const inputId = useId();

    return (
        <>
            <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={onFileSelect}
                style={{ display: "none" }}
            />

            <label
                htmlFor={inputId}
                style={{ cursor: "pointer", display: "inline-flex" }}
                aria-label="Upload image"
            >
                <CiCirclePlus size={36} />
            </label>
        </>
    );
}
