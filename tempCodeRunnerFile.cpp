#include <stdio.h>

int main ()
{
    int c_to_f (int ) ;
    int f_to_c (int ) ;

        char choice;
        float celsius , farhenite ;
        printf("Write F if want to convert celsius to farhenite or C for farhenite to celsius  : ");
        scanf("%c", &choice);


        if (choice == 'F' || choice == 'f')
        {
            printf("Enter the Celsius temperature :  ");
            scanf("%2.f", &celsius);
            int far_converted = f_to_c(celsius);
            printf("The temperature in farhenite is : %d", far_converted);
        }
        else if (choice == 'C' || choice == 'c')
        {
            printf("Enter the Farhenite temperature :  ");
            scanf("%2.f", &farhenite);
            int cel_converted = c_to_f(farhenite);
            printf("The temperature in celcius is : %d" , cel_converted);
        }
        else
        {
            printf("Please enter C or F ");
        }

    return 0;
}

int c_to_f(int celcius)
{
    int farhenite = (9/5 * celcius) + 32 ;
    return farhenite;
}
int f_to_c(int farhenite)
{
    int celcius  = (9/5 * farhenite) + 32 ;
    return celcius;
}