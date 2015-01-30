using UnityEngine;
using System.Collections;
using System;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
 
public class DebugMail : MonoBehaviour {
 
        public void sendMessage ( string tMessage )
        {
            MailMessage mail = new MailMessage();
 
            mail.From = new MailAddress("dannyOnKeys@gmail.com");
            mail.To.Add("dannyOnkeys@gmail.com");
            mail.Subject = "From DebugMail";
            mail.Body = tMessage;
 
            SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
            smtpServer.Port = 587;
            smtpServer.Credentials = new System.Net.NetworkCredential("dannyonkeys@gmail.com", "wpdbglbf") as ICredentialsByHost;
            smtpServer.EnableSsl = true;
            ServicePointManager.ServerCertificateValidationCallback = 
                delegate(object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) 
                    { return true; };
            smtpServer.Send(mail);
         Debug.Log("success");
 
       }
}