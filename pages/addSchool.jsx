import { useForm } from "react-hook-form";
import { useState } from "react";
import "../src/app/globals.css";

export default function AddSchool() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");

    const onSubmit = async (data) => {
        try {
            console.log("Frontend file:", document.getElementById("imageUpload").files[0]);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("address", data.address);
            formData.append("city", data.city);
            formData.append("state", data.state);
            formData.append("contact", data.contact);
            formData.append("email_id", data.email_id);
            formData.append("image", document.getElementById("imageUpload").files[0]);

            const res = await fetch("/api/addSchool", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (res.ok) {
                setMessage("✅ School added successfully!");
                setPreview(null);
                setFileName("No file chosen");
                reset();
            } else {
                setMessage("❌ Error: " + result.message);
            }
        } catch (error) {
            console.error(error);
            setMessage("⚠️ Something went wrong.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFileName(file.name);
        } else {
            setPreview(null);
            setFileName("No file chosen");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Add School
                </h2>

                {/* School Name */}
                <label className="block font-medium text-gray-700 mb-1">School Name</label>
                <input
                    {...register("name", { required: "School name is required" })}
                    className="w-full p-3 border rounded mb-3"
                    placeholder="Enter school name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                {/* Address */}
                <label className="block font-medium text-gray-700 mb-1">Address</label>
                <input
                    {...register("address", { required: "Address is required" })}
                    className="w-full p-3 border rounded mb-3"
                    placeholder="Enter address"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                {/* City */}
                <label className="block font-medium text-gray-700 mb-1">City</label>
                <input
                    {...register("city", { required: "City is required" })}
                    className="w-full p-3 border rounded mb-3"
                    placeholder="Enter city"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

                {/* State */}
                <label className="block font-medium text-gray-700 mb-1">State</label>
                <select
                    {...register("state", { required: "State is required" })}
                    className="w-full p-3 border rounded mb-3"
                >
                    <option value="">-- Select State --</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Delhi">New Delhi</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttrakhand">Uttrakhand</option>
                    <option value="West Bengal">West Bengal</option>
                </select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}

                {/* Contact */}
                <label className="block font-medium text-gray-700 mb-1">Contact Number</label>
                <div className="flex mb-3">
                    {/* Country Code Dropdown */}
                    <select
                        {...register("country_code", { required: "Country code is required" })}
                        className="p-3 border rounded-l w-32 bg-white"
                    >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+81">🇯🇵 +81</option>
                    </select>

                    {/* Contact Input */}
                    <input
                        {...register("contact", {
                            required: "Contact number is required",
                            pattern: {
                                value: /^[0-9]{7,12}$/,
                                message: "Enter a valid contact number",
                            },
                        })}
                        className="flex-1 p-3 border rounded-r"
                        placeholder="Enter phone number"
                    />
                </div>
                {errors.country_code && <p className="text-red-500 text-sm">{errors.country_code.message}</p>}
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}


                {/* Email */}
                <label className="block font-medium text-gray-700 mb-1">Email</label>
                <input
                    {...register("email_id", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Enter a valid email address",
                        },
                    })}
                    className="w-full p-3 border rounded mb-3"
                    placeholder="Enter email"
                />
                {errors.email_id && <p className="text-red-500 text-sm">{errors.email_id.message}</p>}

                {/* Image Upload */}
                <label className="block font-medium text-gray-700 mb-1">School Image</label>
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-blue-500 transition">
                    <label
                        htmlFor="imageUpload"
                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                    >
                        Choose File
                    </label>
                    <span className="ml-3 text-gray-600">{fileName}</span>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        {...register("image", { required: "School image is required" })}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setPreview(URL.createObjectURL(file));
                                setFileName(file.name);
                            } else {
                                setPreview(null);
                                setFileName("No file chosen");
                            }
                        }}
                        className="hidden"
                    />
                </div>
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

                {/* Preview */}
                {preview && (
                    <div className="mt-3">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded border"
                        />
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-800 to-blue-800 text-white px-4 py-3 mt-5 rounded w-full hover:bg-green-700 transition font-medium"
                >
                    Add School
                </button>

                {/* Message */}
                {message && <p className="mt-4 text-center font-medium">{message}</p>}
            </form>
        </div>
    );
}
