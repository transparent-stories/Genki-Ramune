"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';

const DistributorForm = ({ heading = "Ready to join us?" }) => {
    const {
        register, // Registers input fields
        handleSubmit, // Wraps the form submit function with validation
        watch, // Watches the values of specific input fields
        formState: { errors }, // Contains form validation errors
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await fetch('/api/distributor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Email sent successfully");
            } else {
                console.error("Failed to send email");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="flex flex-row justify-center pb-10 px-8 sm:p-20 text-left">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[700px] flex flex-col gap-5">
                {/* Name of your Company */}
                <label>
                    Name of your Company:*
                    <input
                        {...register("companyName", { required: "Company name is required." })}
                        placeholder="Enter your company name"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.companyName && <span className="text-red">{errors.companyName.message}</span>}
                </label>

                {/* Website (if any) */}
                <label>
                    Website (if any):
                    <input
                        {...register("website")}
                        placeholder="Enter your website"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                </label>

                {/* Contact person name */}
                <label>
                    Contact person name:*
                    <input
                        {...register("contactName", { required: "Contact person name is required." })}
                        placeholder="Enter contact person name"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.contactName && <span className="text-red">{errors.contactName.message}</span>}
                </label>

                {/* Email */}
                <label>
                    Email:*
                    <input
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address.",
                            },
                        })}
                        placeholder="Enter your email"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.email && <span className="text-red">{errors.email.message}</span>}
                </label>

                {/* Designation */}
                <label>
                    Designation:*
                    <input
                        {...register("designation", { required: "Designation is required." })}
                        placeholder="Enter your designation"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.designation && <span className="text-red">{errors.designation.message}</span>}
                </label>

                {/* Are you an */}
                <label>
                    Are you an:*
                    <select
                        {...register("role", { required: "Role is required." })}
                        defaultValue=""
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    >
                        <option value="" disabled hidden>Select your role</option>
                        <option value="Importer">Importer</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Local Wholesaler">Local Wholesaler</option>
                        <option value="Local Retailer">Local Retailer</option>
                    </select>
                    {errors.role && <span className="text-red">{errors.role.message}</span>}
                </label>

                {/* Territory where you plan to distribute the products */}
                <label>
                    Territory where you plan to distribute the products:*
                    <input
                        {...register("territory", { required: "Territory is required." })}
                        placeholder="Enter territory details"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.territory && <span className="text-red">{errors.territory.message}</span>}
                </label>

                {/* Shipping address for the samples */}
                <label>
                    Shipping address for the samples:*
                    <input
                        {...register("shippingAddress", { required: "Shipping address is required." })}
                        placeholder="Enter shipping address"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.shippingAddress && <span className="text-red">{errors.shippingAddress.message}</span>}
                </label>

                {/* LinkedIn profile link */}
                <label>
                    LinkedIn profile link:
                    <input
                        {...register("linkedin")}
                        placeholder="Enter LinkedIn profile link"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                </label>

                {/* Plans for the distribution */}
                <label>
                    What are your plans for the distribution of GENKI RAMONE sodas?*
                    <textarea
                        {...register("distributionPlans", { required: "Distribution plans are required." })}
                        placeholder="Describe your plans"
                        className="bg-transparent block w-full border-b p-2 focus:outline-none focus:border-green"
                    />
                    {errors.distributionPlans && <span className="text-red">{errors.distributionPlans.message}</span>}
                </label>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <motion.div
                        className="h-12 min-w-52 my-8 px-8 cursor-pointer rounded-[50px] bg-green flex justify-center items-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        <span className="text-sm sm:text-base text-white lg:text-lg font-medium">
                            Submit
                        </span>
                    </motion.div>
                </div>
            </form>
        </div>
    );
};

export default DistributorForm;
