import React, { useEffect, } from 'react';
import Navbar from '..//layouts/Navbar'
import Footer from '..//layouts/Footer'
import { useSelector } from 'react-redux'
import UploadFile from './UploadFile';
import NotFound from '../NotFound';
import { Redirect } from 'react-router';
import $ from 'jquery'

const UploadInterface = () => {

    const [notFound] = useSelector(state => state.file.notFoundFile)

    useEffect(() => {

        $('#call-to-action,.click-upload').click(function () {
          $('#call-to-action').addClass('upload--loading');
          $('.upload-hidden').click();
        });
        $('.upload-hidden').change(function () {
          $('#call-to-action').removeClass('upload--loading');
          $('body').addClass('file-process-open');
        });
        $('.file-upload-bar-closed').click(function () {
          $('body').removeClass('file-process-open');
        });
        $('.open-progress').click(function () {
          $('body').toggleClass('file-process-open');
        });
    
      
        $(".custom-file-input").on("change", function () {
          var fileName = $(this).val().split("\\").pop();
          $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    
    
      })
    
  

    return (
        <div>
               {!notFound ? localStorage.getItem('token') ? 
                <div>
                  
                    <Navbar />
                    <UploadFile />
                    <Footer />
                    
                </div> : <Redirect to='/signin' /> : <NotFound />
            }
         

        </div>
    );
}

export default UploadInterface;