import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { useState} from 'react';
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";


function ExpenseForm( submitButtonLabel ,onCancel, onSubmit, defaultValues) {
   const [inputs, setInputs] = useState({
      amount: {
        value: defaultValues ? defaultValues.amount.toString() : '',
        isValid: true,
        //isValid: !!defaultValues,
        // isValid: defaultValues ? true : false,
      }, 
      date: {
         value: defaultValues ? getFormattedDate(defaultValues.date) : '',
         isValid: true,
      },
      description: {
         value: defaultValues ? defaultValues.description : '',
         isValid: true,
      },
   });

   function inputChangedHandler(inputIdentifier,enteredValue) {
      setInputs((curInputs) => {
         return {
            ...curInputs,
            [inputIdentifier] : { value: enteredValue, isValid: true },
         };
      });
   }

   function submitHandler() {
      const expenseData = {
         amount: +inputValues.amount.value,
         date: new Date(inputValues.date.value),
         description: inputValues.description.value,
      };

      const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
      const dataIsValid = expenseData.date.toString() !== 'Invalid Data';
      const descriptionIsValid = expenseData.description.trim().length > 0;

      if (!amountIsValid || !dataIsValid || !descriptionIsValid) {
        // Alert.alert('Invalid Input', 'Please check your input values');
         setInputs( (curInputs) => {
            return {
               amount: {value: curInputs.amount.value, isValid: amountIsValid},
               date: {value: curInputs.date.value, isValid: dataIsValid},
               description: {value: curInputs.description.value, isValid: descriptionIsValid},
            };
         });
        return;
      }

      onSubmit(expenseData);
   }

   const formIsInvalid = 
   !inputs.amount.isValid ||
   !inputs.date.isValid ||
   !inputs.description.isValid;

   return (
   <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputsRow}>
         <Input style={styles.rowInput}
         label='Amount'
         invalid={!inputs.amount.isValid}
         textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
         }}/>
         <Input style={styles.rowInput}
         label='Date'
         invalid={!inputs.date.isValid}
         textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxlength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
         }}/>
      </View>
      
      <Input label='Description'
      invalid={!inputs.description.isValid}
      textInputConfig={{
         multiline: true,
         autoCapitalize: 'none',
         autoCorrect: false
         onChangeText: inputChangedHandler.bind(this, 'description'),
         value: inputs.description.value,
      }}/>
   </View>
   { formIsInvalid && (
      <Text style={styles.errorText} >Invalid input values please check your enterd data! </Text>
   )}
   <View style={styles.buttons}>
      <Button style={styles.button} mode='flat' onPress={onCancel}>
         Cancel
      </Button>
      <Button onPress={submitHandler}>
         {submitButtonLabel}
      </Button>
   </View>
   );
}

export default ExpenseForm;

const styles= StyleSheet.create({
   inputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   rowInput: {
      flex:1
   }, 
   form: {
      marginTop: 80,
   },
   title : {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 24,
      textAlign: 'center'
   },
   buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   }, 
   button: {
      minWidth: 120,
      marginHorizontal: 8
   },
   errorText: {
      textAlign: 'center',
      color: GlobalStyles.colors.error500,
      margin: 8
   }
});