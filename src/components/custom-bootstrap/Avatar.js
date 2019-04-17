import React,{Component} from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import {Button,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faUpload } from '@fortawesome/free-solid-svg-icons';

export default class AvatarUpload extends Component{
    constructor(props){
        super(props);
        this.state = {image:undefined,scale:1.7,value:undefined}
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    handleScale = (value) => this.setState({ scale: value });

    handleUpload = (e) => {
        if(e.target.files[0]){
            if (e.target.files[0].size > 5242880) this.setState({error:'Imagens devem ter no máximo 5MB'});
            else if (e.target.files[0].type !== 'image/jpeg' & e.target.files[0].type !== 'image/png' & e.target.files[0].type !== 'image/jpg') this.setState({error:'Os formatos aceitos são: jpg, png e jpeg'});
            else {this.setState({image: e.target.files[0],error:undefined});}
        }
    }

    handleChangeImage(){
        const { input: { onChange } } = this.props
        if(this.editor)
            this.editor.getImageScaledToCanvas().toBlob((blob) => {
                new File([blob], 'profile', {type: blob.type, lastModified: Date.now()});
                onChange(blob);
            });
    }

    handleRemoveImage = e => this.setState({image:undefined,value:undefined});

    render(){
        const {
            height,
            placeholder,
            label
        } = this.props;
        let message;
        const {error,warning,image,scale} = this.state;
        if (error || warning) message = <Form.Control.Feedback>{ error || warning }</Form.Control.Feedback>;
        return (
            <Form.Group className='avatar-upload' style={{width:height}}>
                <Form.Label>{label}</Form.Label>
                {
                    image ?
                    <div>
                    <Button className='delete-image' variant="danger"  onClick={this.handleRemoveImage} ><FontAwesomeIcon icon={faTrashAlt} style={{height:'16px',width:'16px'}}/></Button>
                    <ReactAvatarEditor className='image'
                        image={image}
                        ref={(editor) => {this.editor = editor}}
                        width={height-20}
                        height={height-20}
                        color={[255, 255, 255, 0.6]}
                        border={10}
                        scale={scale}
                        borderRadius={100}
                        onMouseUp={this.handleChangeImage}
                        onImageReady={this.handleChangeImage}
                        onImageChange={this.handleChangeImage}
                        />
                    </div> :
                    <div className='empty-upload'  onClick={()=>{this.upload.click()}} style={{height,width:height}}>
                        <FontAwesomeIcon icon={faUpload}/>
                        <p>{placeholder ? placeholder : 'Envie uma foto'}</p>
                    </div>
                }
                
                <Slider className="image-scale" onAfterChange={this.handleChangeImage} min={1.2} max={3} step={0.01} onChange={this.handleScale} value={this.state.scale}/>
                <Form.Control style={{display: 'none'}} type="file" ref={(ref) => this.upload = ref} accept='.jpg, .png, .jpeg' onChange={this.handleUpload}/>
                {message}
            </Form.Group>
    )
    }
}