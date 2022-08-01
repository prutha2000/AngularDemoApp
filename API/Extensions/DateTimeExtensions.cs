﻿namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime DoB)
        {
            var today = DateTime.Today;
            var age = today.Year - DoB.Year;
            if (today.Date > today.AddYears(-age)) age--;
            return age;  
        }
    }
}
