import type { Control, FieldArrayWithId, FieldValues } from 'react-hook-form';

import { useFieldArray } from 'react-hook-form';

import { cn } from '@/lib/utils';

import type { ArrayPath } from 'react-hook-form';
import React from 'react';

type Props<
	TFieldValues extends FieldValues,
	TName extends ArrayPath<TFieldValues>
> = {
	/**
	 * The name of the field array.
	 */
	name: TName;
	/**
	 * The form control from react-hook-form.
	 */
	control: Control<TFieldValues>;
	/**
	 * The minimum number of items allowed in the array.
	 */
	minLength?: number;
	/**
	 * The maximum number of items allowed in the array.
	 */
	maxLength?: number;
	/**
	 * The initial item to append to the array when add field button is clicked.
	 */
	appendItem: TFieldValues[TName] extends (infer U)[] ? U : never;
	/**
	 * Optional additional class names for styling.
	 */
	className?: string;
	/**
	 * Render function for each field in the array.
	 */
	fieldRender: (props: {
		/**
		 * The field array item.
		 */
		field: FieldArrayWithId<TFieldValues, TName>;
		/**
		 * The index of the field array item.
		 */
		index: number;
		/**
		 * Handler to delete the field array item.
		 */
		deleteFieldHandler: () => void;
		/**
		 * Whether the field array item is disabled based on the min/max length rules.
		 */
		isDisabled: boolean;
	}) => React.ReactNode;
	/**
	 * Render function for the add field button.
	 */
	addFieldButton: (props: {
		/**
		 * Handler to add a new field array item.
		 */
		addFieldHandler: () => void;
		/**
		 * Whether the add field button is disabled based on the min/max length rules.
		 */
		isDisabled: boolean;
	}) => React.ReactNode;
};

/**
 * ArrayField component for rendering a dynamic array of fields.
 */
export function ArrayField<
	TFieldValues extends FieldValues,
	TName extends ArrayPath<TFieldValues>
>({
	name,
	maxLength,
	minLength,
	control,
	appendItem,
	className,
	fieldRender,
	addFieldButton,
}: Props<TFieldValues, TName>) {
	const arrayField = useFieldArray({
		control: control,
		name: name,
		rules: {
			minLength,
			maxLength,
		},
	});

	return (
		<div className={cn('space-y-6', className)}>
			{arrayField.fields.map((field, index) =>
				fieldRender({
					field: field as FieldArrayWithId<TFieldValues, TName>,
					index,
					deleteFieldHandler: () => arrayField.remove(index),
					isDisabled: minLength ? arrayField.fields.length <= minLength : false,
				})
			)}

			{addFieldButton({
				addFieldHandler: () => arrayField.append(appendItem as any),
				isDisabled: maxLength ? arrayField.fields.length >= maxLength : false,
			})}
		</div>
	);
}
