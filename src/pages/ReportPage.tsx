import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2, Image, Send, Upload, X } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useItems } from '../features/items/context/useItems';
import { categories, type Item } from '../features/items/types/item';

const today = new Date().toISOString().slice(0, 10);
const schema = z.object({
  type: z.enum(['lost', 'found']),
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  category: z.enum(categories),
  description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
  location: z.string().trim().min(2, 'Please enter a location.'),
  date: z.string().min(1, 'Please select a date.').refine((value) => value <= today, 'Date cannot be in the future.'),
  imageUrl: z.string().trim().refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }, 'Enter a valid image URL.'),
  contactName: z.string().trim().min(2, 'Please enter a contact name.'),
  contactEmail: z.string().trim().email('Please enter a valid email address.'),
  contactPhone: z.string().trim().min(7, 'Please enter a valid phone number.').regex(/^[+()\d\s.-]+$/, 'Please enter a valid phone number.'),
});
type FormValues = z.infer<typeof schema>;

export function ReportPage() {
  const { addItem } = useItems();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [imageError, setImageError] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { type: 'lost', category: 'Electronics', date: today, imageUrl: '' } });
  const selectedType = watch('type');
  const field = (name: keyof FormValues, label: string, input: ReactNode) => <div><label className="label" htmlFor={name}>{label}</label>{input}{errors[name] && <p className="field-error" id={`${name}-error`}>{errors[name]?.message}</p>}</div>;
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('Please choose an image file.');
      setUploadedImage(null);
      return;
    }
    if (file.size > 1_000_000) {
      setImageError('Image must be smaller than 1 MB so it can be saved on this device.');
      setUploadedImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      setUploadedImage(reader.result);
      setUploadedFileName(file.name);
      setImageError('');
      clearErrors('imageUrl');
    };
    reader.onerror = () => setImageError('We could not read that image. Please try another file.');
    reader.readAsDataURL(file);
  };
  const clearUploadedImage = () => {
    setUploadedImage(null);
    setUploadedFileName('');
    setImageError('');
    setFileInputKey((value) => value + 1);
  };
  const onSubmit = (values: FormValues) => {
    const finalImageUrl = uploadedImage ?? values.imageUrl;
    if (!finalImageUrl) {
      setError('imageUrl', { type: 'manual', message: 'Upload an image or enter an image URL.' });
      return;
    }
    const id = `${values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${crypto.randomUUID().slice(0, 8)}`;
    const item: Item = { ...values, imageUrl: finalImageUrl, contactMethod: values.contactEmail, id, status: 'active', createdAt: new Date().toISOString() };
    addItem(item); setSubmitted(true); window.setTimeout(() => navigate(`/items/${id}`), 650);
  };
  return <main className="container-page py-8 sm:py-14">
    <Link to="/" className="mb-7 inline-flex items-center gap-2 rounded-lg font-bold text-slate-600 hover:text-brand-700"><ArrowLeft size={18} /> Back to items</Link>
    <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
      <section><p className="text-sm font-bold uppercase tracking-widest text-brand-600">Make a post</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight">Help an item find its way home.</h1><p className="mt-5 leading-7 text-slate-600">Share the details you know. A clear description and recent photo give your community the best chance of helping.</p><div className="mt-8 rounded-2xl bg-ink p-6 text-white"><Image className="text-blue-300" /><h2 className="mt-4 text-lg font-bold">Photo tip</h2><p className="mt-2 text-sm leading-6 text-slate-300">Use a clear, well-lit image. Avoid showing sensitive personal information.</p></div></section>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        {submitted && <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-800" role="status" aria-live="polite"><CheckCircle2 size={20} /> Post created! Opening its details…</div>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <fieldset><legend className="label">Is this item lost or found?</legend><div className="mt-2 grid grid-cols-2 gap-3">{(['lost', 'found'] as const).map((type) => <label key={type} className={`cursor-pointer rounded-xl border-2 p-4 text-center font-bold capitalize transition ${selectedType === type ? type === 'lost' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 hover:border-slate-300'}`}><input type="radio" value={type} className="sr-only" {...register('type')} />{type}</label>)}</div></fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            {field('title', 'Item title', <input id="title" className="field" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} {...register('title')} />)}
            {field('category', 'Category', <select id="category" className="field" {...register('category')}>{categories.map((category) => <option key={category}>{category}</option>)}</select>)}
          </div>
          {field('description', 'Description', <textarea id="description" rows={5} className="field resize-y" aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : undefined} {...register('description')} />)}
          <div className="grid gap-5 sm:grid-cols-2">
            {field('location', 'Location', <input id="location" className="field" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? 'location-error' : undefined} {...register('location')} />)}
            {field('date', 'Date', <input id="date" type="date" max={today} className="field" aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} {...register('date')} />)}
          </div>
          <div>
            <span className="label">Item image</span>
            {uploadedImage ? <div className="relative mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img src={uploadedImage} alt="Selected item preview" className="h-56 w-full object-cover" />
              <div className="flex items-center justify-between gap-3 p-3"><p className="truncate text-sm font-semibold text-slate-600">{uploadedFileName}</p><button type="button" onClick={clearUploadedImage} className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-red-600 hover:bg-red-50"><X size={15} /> Remove</button></div>
            </div> : <label htmlFor="imageUpload" className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-brand-500 hover:bg-brand-50">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-brand-700"><Upload size={20} /></span>
              <span className="mt-3 font-bold text-ink">Choose an image</span>
              <span className="mt-1 text-sm text-slate-500">JPG, PNG, WebP or GIF — up to 1 MB</span>
              <input key={fileInputKey} id="imageUpload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} aria-describedby={imageError ? 'upload-error' : undefined} />
            </label>}
            {imageError && <p className="field-error" id="upload-error" role="alert">{imageError}</p>}
            <div className="my-4 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200" />or use a URL<span className="h-px flex-1 bg-slate-200" /></div>
            <label className="sr-only" htmlFor="imageUrl">Image URL</label>
            <input id="imageUrl" type="url" className="field !mt-0 read-only:bg-slate-100" readOnly={Boolean(uploadedImage)} aria-invalid={Boolean(errors.imageUrl)} aria-describedby={errors.imageUrl ? 'imageUrl-error' : undefined} placeholder={uploadedImage ? 'Using uploaded image' : 'https://example.com/item-photo.jpg'} {...register('imageUrl')} />
            {errors.imageUrl && <p className="field-error" id="imageUrl-error">{errors.imageUrl.message}</p>}
          </div>
          {field('contactName', 'Contact name', <input id="contactName" className="field" aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? 'contactName-error' : undefined} {...register('contactName')} />)}
          <div className="grid gap-5 sm:grid-cols-2">
            {field('contactEmail', 'Contact email', <input id="contactEmail" type="email" className="field" aria-invalid={Boolean(errors.contactEmail)} aria-describedby={errors.contactEmail ? 'contactEmail-error' : undefined} {...register('contactEmail')} />)}
            {field('contactPhone', 'Phone number', <input id="contactPhone" type="tel" className="field" aria-invalid={Boolean(errors.contactPhone)} aria-describedby={errors.contactPhone ? 'contactPhone-error' : undefined} {...register('contactPhone')} />)}
          </div>
          <button className="btn-primary w-full" disabled={isSubmitting || submitted}><Send size={18} /> Publish post</button>
        </form>
      </section>
    </div>
  </main>;
}
