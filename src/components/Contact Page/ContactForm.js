"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';

const ContactForm = ({ heading = "Contact Us" }) => {
    const {
        register, // Registers input fields
        handleSubmit, // Wraps the form submit function with validation
        reset, // Watches the values of specific input fields
        formState: { errors }, // Contains form validation errors
    } = useForm();

    const [message, setMessage] = useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Email sent successfully");
                setMessage({ type: "success", text: "✅ Form submitted successfully!" });
                reset(); // Clears the form
            } else {
                console.error("Failed to send email");
                setMessage({ type: "error", text: "Failed to submit the form. Please try again." });
            }
        } catch (error) {
            // console.error("Error submitting form:", error);
            setMessage({ type: "error", text: "Something went wrong. Please check your connection and try again." });
        }
    };


    return (
        <div className="flex flex-row justify-center sm:pb-0 px-8 sm:p-20 text-left">
            {/* <h2 className="text-2xl font-bold mb-6">{heading}</h2> */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[700px] flex flex-col gap-5">
                {/* Salutation */}
                <label>
                    Salutation:
                    <select required defaultValue="" {...register("salutation", { required: "Please Choose" })} className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green">
                        <option value="" disabled hidden>Mr./Ms./Mrs.</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                    </select>
                    {errors.salutation && <span className="text-red">{errors.salutation.message}</span>}
                </label>

                {/* Your Name */}
                <label>
                    Your Name:
                    <input
                        {...register("name", { required: "Your name is required." })}
                        placeholder="Enter your name"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.name && <span className="text-red">{errors.name.message}</span>}
                </label>

                {/* Your Email */}
                <label>
                    Your Email:*
                    <input
                        {...register("email", {
                            required: "Your email is required.",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address.",
                            },
                        })}
                        placeholder="Enter your email"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </label>

                {/* Phone */}
                <label>
                    Phone:
                    <input
                        {...register("phone")}
                        placeholder="Enter your phone number"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                </label>

                {/* Company */}
                <label>
                    Company:*
                    <input
                        {...register("company", { required: "Company name is required." })}
                        placeholder="Enter your company name"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.company && <span className="text-red-500">{errors.company.message}</span>}
                </label>

                {/* Website */}
                <label>
                    Website:*
                    <input
                        {...register("website", { required: "Website is required." })}
                        placeholder="Enter your website"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.website && <span className="text-red-500">{errors.website.message}</span>}
                </label>

                {/* Contact Purpose */}
                <label>
                    Contact Purpose:
                    <select {...register("contactPurpose")} className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green">
                        <option value="Product Information">Product Information</option>
                    </select>
                </label>

                {/* Are you an */}
                <label>
                    Are you an:
                    <select {...register("role")} className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green">
                        <option value="Importer">Importer</option>
                        <option value="Distributor">Distributor</option>
                    </select>
                </label>

                {/* Comments / Message */}
                <label>
                    Your Comments/Message:
                    <textarea
                        {...register("message")}
                        placeholder="Enter your message"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                </label>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <motion.div
                        className={`h-12 min-w-52 my-8 px-8 cursor-pointer rounded-[50px] ${message?.type === "error" ? "bg-red" : "bg-green"} flex justify-center items-center`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={handleSubmit(onSubmit)} // Trigger form submission
                    >
                        <span className="text-sm sm:text-base text-white lg:text-lg font-medium">
                            {message ? message.text : "Submit"}
                        </span>
                    </motion.div>
                </div>

                <div className="flex justify-center">
                    {message && (
                        <span
                            className={`text-sm sm:text-base lg:text-lg font-medium ${message.type === "error" ? "text-red" : "text-green"
                                }`}
                        >
                            {message.type === "error"
                                ? "Facing an error? Please reach out to us at info@nizona.co"
                                : "We'll soon reach out to you via your given email address"}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
